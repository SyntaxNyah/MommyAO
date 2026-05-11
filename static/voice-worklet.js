// Audio worklet processors for the server-relayed voice transport.
//
//   capture-processor  — chunks the mic input stream into fixed-size frames
//                        (frameSamples Float32 samples each) and posts every
//                        frame to the main thread for encoding.
//   playback-processor — pulls decoded PCM frames from a queue fed by the
//                        main thread; primes with a few frames of buffer to
//                        absorb network jitter, drops back to silence and
//                        re-primes on underrun.
//
// Served as a static asset rather than inlined as a Blob URL so it satisfies
// strict CSP (script-src-elem 'self') deployments.

class CaptureProcessor extends AudioWorkletProcessor {
  constructor(opts) {
    super(opts);
    const o = (opts && opts.processorOptions) || {};
    this.frameSamples = (o.frameSamples | 0) || 960;
    this.buf = new Float32Array(this.frameSamples);
    this.pos = 0;
  }
  process(inputs, outputs) {
    const out = outputs[0];
    if (out && out[0]) out[0].fill(0);
    const input = inputs[0];
    if (!input || !input[0]) return true;
    const ch = input[0];
    let i = 0;
    while (i < ch.length) {
      const space = this.frameSamples - this.pos;
      const copy = Math.min(space, ch.length - i);
      this.buf.set(ch.subarray(i, i + copy), this.pos);
      this.pos += copy;
      i += copy;
      if (this.pos === this.frameSamples) {
        const frame = this.buf.slice(0);
        this.port.postMessage(frame, [frame.buffer]);
        this.pos = 0;
      }
    }
    return true;
  }
}

class PlaybackProcessor extends AudioWorkletProcessor {
  constructor(opts) {
    super(opts);
    const o = (opts && opts.processorOptions) || {};
    this.targetQueue = (o.targetQueueFrames | 0) || 3;
    this.queue = [];
    this.cur = null;
    this.curPos = 0;
    this.primed = false;
    this.port.onmessage = (e) => {
      if (e.data === "reset") {
        this.queue = [];
        this.cur = null;
        this.curPos = 0;
        this.primed = false;
        return;
      }
      this.queue.push(e.data);
    };
  }
  process(_inputs, outputs) {
    const out = outputs[0][0];
    if (!out) return true;
    if (!this.primed) {
      if (this.queue.length < this.targetQueue) {
        out.fill(0);
        return true;
      }
      this.primed = true;
    }
    let outPos = 0;
    while (outPos < out.length) {
      if (!this.cur) {
        if (this.queue.length === 0) {
          for (; outPos < out.length; outPos++) out[outPos] = 0;
          this.primed = false;
          break;
        }
        this.cur = this.queue.shift();
        this.curPos = 0;
      }
      const remaining = this.cur.length - this.curPos;
      const space = out.length - outPos;
      const copy = Math.min(remaining, space);
      out.set(this.cur.subarray(this.curPos, this.curPos + copy), outPos);
      this.curPos += copy;
      outPos += copy;
      if (this.curPos >= this.cur.length) this.cur = null;
    }
    return true;
  }
}

registerProcessor("capture-processor", CaptureProcessor);
registerProcessor("playback-processor", PlaybackProcessor);
