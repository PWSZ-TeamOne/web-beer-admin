export default {
  methods: {
    checkForm() {
      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
        this.alert('Email required!', 'error');
      }
      if (!this.password) {
        this.errors.push('Password required.');
        this.alert('Password required!', 'error');
      }

      if (this.errors.length) {
        return false;
      } else {
        return true;
      }
    }
  }
}
