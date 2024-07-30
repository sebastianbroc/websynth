export default function EnvelopeGenerator(context, a, d, s, r) {

    this.context = context
    this.attackTime = a;
    this.decayTime = d;
    this.sustainTime = s;
    this.releaseTime = r;

    EnvelopeGenerator.prototype.updateData = (a, d, s, r) => {
        this.attackTime = a;
        this.decayTime = d;
        this.sustainTime = s;
        this.releaseTime = r;
    }

    EnvelopeGenerator.prototype.trigger = function() {
        if(this.param){
            let now = this.context.currentTime;
            try{
                this.param.cancelScheduledValues(now);
            }catch(e){
                //do nothing
            }
            this.param.setValueAtTime(0, now);
            this.param.linearRampToValueAtTime(1, now + this.attackTime);
            this.param.linearRampToValueAtTime(0.5, now + this.attackTime + this.decayTime);
            this.param.linearRampToValueAtTime(0.5, now + this.attackTime + this.decayTime + this.sustainTime);
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
