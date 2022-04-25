<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <h2 class="text-center">Sign Up</h2>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="user.email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                <div class="form-group">
                    <label>Password confirm</label>
                    <input type="password" class="form-control" v-model="user.passwordConfirm" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Create a new user</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import { SignUpUser } from '../configure';

    export default {
        data() {
            console.log("Sign up")
            return {
                user: {
                   name: '',
                   email: 'test@co.uk',
                   password: '',
                   passwordConfirm: ''
                }
            }
        },
        methods: {
            handleSubmitForm() { 
                console.log("Submit form: "+ this.user.name);
                if(this.user.password == this.user.passwordConfirm) {
                    SignUpUser(this.user, this.successCallback);
                }
                else {
                    alert("Password is not confirmed");
                }
            },
            successCallback() {                
                this.$router.push('/');
            }
        }
    }
</script>