<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.Username">
                        <td>{{ user.Username }}</td>
                        <td>{{ user.UserStatus }}</td>
                        <td>{{ user.phone }}</td>
                        <!-- <td>
                            <router-link :to="{name: 'edit', params: { id: user._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteStudent(user._id)" class="btn btn-danger">Delete</button>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { ListUsers } from '../configure';

    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            ListUsers(this.userListCallback);
        },
        methods: {
            deleteStudent(id){
                let apiURL = `http://localhost:4000/api/delete-student/${id}`;
                let indexOfArrayItem = this.Students.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Students.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            userListCallback(users) {
                console.log(users);
                this.Users = users;
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>