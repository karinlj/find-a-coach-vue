<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @blur="clearErrors('firstname')"
      />
      <p class="error" v-if="!firstname.isValid">Firstname must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.val"
        @blur="clearErrors('lastname')"
      />
      <p class="error" v-if="!lastname.isValid">Lastname must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="lastname">Description</label>
      <textarea
        type="text"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearErrors('description')"
      ></textarea>
      <p class="error" v-if="!description.isValid">Description must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="hourlyRate">Hourly rate</label>
      <input type="number" id="hourlyRate" v-model.number="rate.val" @blur="clearErrors('rate')" />
      <p class="error" v-if="!rate.isValid">Hourly rate must be greater than 0.</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise.</h3>
      <div>
        <label for="frontend">Frontend development</label>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearErrors('areas')"
        />
      </div>
      <div>
        <label for="backend">Backend development</label>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearErrors('areas')"
        />
      </div>
      <div>
        <label for="career">Career Advisory</label>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearErrors('areas')"
        />
      </div>
      <p class="error" v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <base-btn>Register</base-btn>
  </form>
</template>

<script>
import BaseBtn from "../ui/BaseBtn.vue";
export default {
  emits: ["save-data"],
  components: { BaseBtn },
  name: "CoachForm",
  data() {
    return {
      firstname: {
        val: "",
        isValid: true,
      },
      lastname: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    //is called on blur
    //prop is passed in
    clearErrors(input) {
      //   this[input] = ex: this.firstname
      this[input].isValid = true;
    },
    validateForm() {
      //incase it has become false in the last validation
      this.formIsValid = true;
      if (this.firstname.val === "") {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.val === "") {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      //obs here null=falsy
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      //obs here
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      //if form is not valid: return to break
      if (!this.formIsValid) {
        return;
      }
      //make object
      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      //emit and send object
      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.error {
  margin-top: 2px;
  color: #666;
}
</style>
