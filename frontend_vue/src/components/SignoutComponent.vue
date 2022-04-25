<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <h2 class="text-center">Sign Out</h2>
            <h4 class="text-center">Are you sure sign out right now?</h4>
            <div class="d-flex justify-content-around">
                <button @click.prevent="ClickSignOut" class="btn btn-danger ">SignOut</button>
                <button @click.prevent="ClickCancel" class="btn btn-primary">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {UserPool} from '../configure';

    export default {
        methods: {
            ClickSignOut() { 
                console.log("Click sign out");
                UserPool.getCurrentUser().signOut();
                this.$router.push("/");
            },
            ClickCancel() { 
                console.log("Click cancel");
                this.$router.go(-1);
            }
        }
    }
</script>