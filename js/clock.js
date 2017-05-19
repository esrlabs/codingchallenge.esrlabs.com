(function(){
  var SETTINGS = {
    REF_ID      : 'ref_to_issue',
    CLOCK_ID    : 'clockdiv',
    HREF_PATTERN: 'https://github.com/esrlabs/codingchallenge/issues/',
    SWITCHER    : {
      hh        : 11,
      mm        : 00,
      ss        : 00,
      duration  : 7 * 24 * 60 * 60 * 1000 //d * h * m * s * ms
    },
    START       : {
      YYYY  : 2017,
      MM    : 2, //Month in JS starts from 0. Match will be 2 for example
      DD    : 10
    },
    INTERVAL    : 1000
  };

  var Clock = function(){
    this.href         = document.getElementById(SETTINGS.REF_ID);
    this.clock        = document.getElementById(SETTINGS.CLOCK_ID);
    this.daysSpan     = this.clock.querySelector('.days');
    this.hoursSpan    = this.clock.querySelector('.hours');
    this.minutesSpan  = this.clock.querySelector('.minutes');
    this.secondsSpan  = this.clock.querySelector('.seconds');
  };

  Clock.prototype = {

    updateRef       : function(){
      var iteraction  = this.getNextDeadLine().iteraction;
      this.href.href  = SETTINGS.HREF_PATTERN + iteraction;
    },

    updateClock     : function(){
      var t = this.getTimeRemaining();
      this.daysSpan.innerHTML     = t.days;
      this.hoursSpan.innerHTML    = ('0' + t.hours).slice(-2);
      this.minutesSpan.innerHTML  = ('0' + t.minutes).slice(-2);
      this.secondsSpan.innerHTML  = ('0' + t.seconds).slice(-2);
    },

    getNextDeadLine : function(){
      var start       = (new Date(SETTINGS.START.YYYY, SETTINGS.START.MM, SETTINGS.START.DD, SETTINGS.SWITCHER.hh, SETTINGS.SWITCHER.mm, SETTINGS.SWITCHER.ss)).getTime(),
          current     = (new Date()).getTime(),
          iteraction  = Math.floor((current - start) / SETTINGS.SWITCHER.duration),
          next        = start + iteraction * SETTINGS.SWITCHER.duration + SETTINGS.SWITCHER.duration;
          return {
            time        : new Date(next),
            iteraction  : iteraction
          };
    },

    getTimeRemaining: function(){
      var deadline  = this.getNextDeadLine().time,
          t         = Date.parse(deadline) - Date.parse(new Date());
      return {
        total   : t,
        days    : Math.floor(t / (1000 * 60 * 60 * 24)),
        hours   : Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes : Math.floor((t / 1000 / 60) % 60),
        seconds : Math.floor((t / 1000) % 60)
      };
    },

    tick : function() {
      this.updateRef();
      this.updateClock();
      setTimeout(this.tick.bind(this), SETTINGS.INTERVAL);
    }

  };

  $(function(){
    var clock = new Clock();
    clock.tick();
  });

}());

