<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <h2 class="text-center">Sign In</h2>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger btn-block">Sign in</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { AuthenticateUser } from '../configure';

    export default {
        data() {
            console.log("Sign in")
            return {
                user: {
                   name: '',
                   password: ''
                }
            }
        },
        methods: {
            handleSubmitForm() { 
                console.log("Submit form: "+ this.user.name);
                AuthenticateUser(this.user, this.successCallback);
            },
            successCallback() {                
                this.$router.push('/');
            }
        }
    }
</script>