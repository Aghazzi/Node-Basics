/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", onDataReceived);
    console.log(`Welcome to ${name}'s application!`);
    console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
    if (text === "quit\n" || text === "exit\n") {
        quit();
    } else if (text.startsWith("hello")) {
        hello(text.trim());
    } else if (text === "help\n") {
        help();
    } else if (text === "list\n") {
        list();
    } else if (text.trim().split(" ")[0] === "add") {
        add(text);
    } else if (text.trim().split(" ")[0] === "remove") {
        remove(text);
    } else {
        unknownCommand(text);
    }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
    console.log('unknown command: "' + c.trim() + '"');
}

//  Says help
//  This function is supposed to give you all the lists of the commands that exists

function help() {
    console.log(
        "the list of commands :\n hello + add additional information\n exit\n quit"
    );
}
/**
 * Says hello
 *
 * @returns {void}
 */
function hello(n) {
    n = n.replace("hello", "");
    console.log("hello" + n + "!");
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
    console.log("Quitting now, goodbye!");
    process.exit();
}
var tasks = ["attendance", "pull", "commit", "push"];
function list() {
    tasks.map((task, index) => {
        console.log(`${index + 1}:${task}`);
    });
}
var tasks = [];
function add(text) {
    var task = text.trim().split(" ");
    task.shift();
    task = task.join(" ");
    if (task.trim()) {
        tasks.push(task);
        console.log(`task added ${task}`);
    } else {
        console.log("Please add a task");
    }
}
function remove(text) {
    if (text.trim().split(" ")[1]) {
        var n = text.trim().split(" ")[1];
        for (let i = 0; i < tasks.length; i++) {
            if (i == n - 1) {
                tasks.splice(i, 1);
                console.log(`task ${n} removed`);
            }
        }
    } else {
        tasks.pop();
        console.log("last task removed");
    }
}

// The following line starts the application
startApp("Ahmad Ghazzi");
