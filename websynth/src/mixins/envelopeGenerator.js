export default function EnvelopeGenerator(context, a, d, s, r, i) {

    this.context = context
    this.attackTime = a;
    this.decayTime = d;
    this.sustainTime = s;
    this.releaseTime = r;
    this.intensity = i;

    EnvelopeGenerator.prototype.updateData = (a, d, s, r, i) => {
        this.attackTime = a;
        this.decayTime = d;
        this.sustainTime = s;
        this.releaseTime = r;
        this.intensity = i;
    }

    EnvelopeGenerator.prototype.trigger = function() {
        if(this.param){
            let now = this.context.currentTime;
            this.param.cancelScheduledValues(now);
            this.param.setValueAtTime(0, now);
            this.param.linearRampToValueAtTime(1 * this.intensity, now + this.attackTime);
            this.param.linearRampToValueAtTime(0.5 * this.intensity, now + this.attackTime + this.decayTime);
            this.param.linearRampToValueAtTime(0.5 * this.intensity, now + this.attackTime + this.decayTime + this.sustainTime);
            this.param.linearRampToValueAtTime(0, now + this.attackTime + this.decayTime + this.sustainTime + this.releaseTime);
        }
    };

    EnvelopeGenerator.prototype.connect = function(param) {
        this.param = param;
    };

    EnvelopeGenerator.prototype.disconnect = function() {
        this.param = null;
    };
}
