import Alpine from 'alpinejs'

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    running: false,
    currentStep: 'start',
    inhaleDuration: 5,
    holdAfterInhaleDuration: 5,
    exhaleDuration: 5,
    holdAfterExhaleDuration: 5,
    cycles: 6,

    presets: {
      'default': {
        'inhaleDuration': 5,
        'holdAfterInhaleDuration': 5,
        'exhaleDuration': 5,
        'holdAfterExhaleDuration': 5,
      },
      'focus': {
        'inhaleDuration': 4,
        'holdAfterInhaleDuration': 7,
        'exhaleDuration': 8,
        'holdAfterExhaleDuration': 0,
      },
      'balance': {
        'inhaleDuration': 5,
        'holdAfterInhaleDuration': 0,
        'exhaleDuration': 5,
        'holdAfterExhaleDuration': 0,
      },
    },

    start() {
      this.running = true;
      this.breathLoop(this.cycles);
    },

    async breathLoop(cycles) {
      let cyclesLeft = cycles

      while (cyclesLeft >= 0 && this.running) {
        console.log('cycles left: ' + cyclesLeft)

        // Inhale
        this.currentStep = 'inhale'
        await this.sleep(this.inhaleDuration * 1000);

        // Hold after inhale
        if (this.holdAfterInhaleDuration > 0) {
          this.currentStep = 'hold'
          await this.sleep(this.holdAfterInhaleDuration * 1000);
        }

        // Exhale
        this.currentStep = 'exhale'
        await this.sleep(this.exhaleDuration * 1000);

        // Hold after exhale
        if (this.holdAfterExhaleDuration > 0) {
          this.currentStep = 'hold'
          await this.sleep(this.holdAfterExhaleDuration * 1000);
        }

        cyclesLeft--;
      }

      this.currentStep = 'start'
    },

    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    applyPreset(preset) {
      this.inhaleDuration = preset['inhaleDuration'];
      this.holdAfterInhaleDuration = preset['holdAfterInhaleDuration'];
      this.exhaleDuration = preset['exhaleDuration'];
      this.holdAfterExhaleDuration = preset['holdAfterExhaleDuration'];
    },
  })
});

Alpine.start()
