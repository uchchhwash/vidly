const { func } = require("joi");

// const user = getUser(3, (user) => {
//     console.log(user);
//     if (user) {
//         let repositories = getRepositories(3, (repo) => {
//             console.log(repo);
//             if (repo) {
//                 let commits = getCommits(repo, (commits) => {
//                     console.log(commits);
//                 })
//             }
//         })
//     }
// });

const user = getUser(1, (user) => {
    console.log("1")
    getRepositories(user.gitHubUsername, (repos) => {
        console.log("2")
        getCommits(repos, (commits) => {
            console.log("3")
        })
    })
});


// const user = getUser(1, getRepositories);

// function getRepositories(user) {
//     getRepositories(user.gitHubUsername, getCommits)
// }

// function getCommits(repos) {
//     getCommits(repos, displayCommits)
// }

// function displayCommits(commits) {
//     console.log("3");
// }

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: "rdx" })
    }, 1000);
}

function getRepositories(user, callback) {
    setTimeout(() => {
        callback(["repo1", "repo2", "repo3"]);
    }, 1000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        callback(["commit 1", "commit 2", "commit 3"]);
    }, 1000);
}