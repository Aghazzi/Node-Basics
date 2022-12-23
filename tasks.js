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
    } else if (text.trim().split(" ")[0] === "edit") {
        edit(text);
    } else if (text.trim().split(" ")[0] === "check") {
        check(text);
    } else if (text.trim().split(" ")[0] === "uncheck") {
        uncheck(text);
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
        "the list of commands :\n hello + add additional information\n exit: to exit the app\n quit: to quit the app\n list (to list the added tasks)\n add (to add a new task to the list)\n edit + (number of the task): will let you edit the task you want\n remove (to remove the last task)\n remove + (number of the task): to remove the specified task\n check + (number of the task): will let you check the task you want\n uncheck + (number of the task): will allow you to uncheck the task you want"
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
    let fs = require("fs");
    let data = JSON.stringify(objList);
    try {
        fs.writeFileSync(savefile, data);
        console.log(`Saving changes...`);
    } catch (error) {
        console.error(error);
    }
    console.log("Quitting now, goodbye!");
    process.exit();
}

let savefile;
if (process.argv[2] == null) {
    savefile = "database.json";
} else {
    savefile = process.argv[2];
    console.log(savefile)
}

var tasks;
const fs = require("fs");
try {
    let data = fs.readFileSync(savefile);
    var objList = JSON.parse(data);
} catch (e) {
    console.error(e)
    console.log(`this file is not present, we will create it!`);
}
if (objList !== undefined) {
    tasks = objList.tasks;
} else {
    objList = { tasks: [] };
    tasks = objList.tasks;
}



// FUNCTION list it lists all the tasks you have

function list() {
    tasks.map((g, index) => {
        if (g.status) {
            console.log(`${index + 1} - [✔] ${g.task}`);
        } else {
            console.log(`${index + 1} - [ ] ${g.task}`);
        }
    });
}

// FUNCTION ADD will add tasks to your existing list

function add(text) {
    var task = text.trim().split(" ");
    task.shift();
    task = task.join(" ");
    if (task.trim()) {
        let g = {
            task: task.trim(),
            status: false,
        };
        tasks.push(g);
        console.log(`${task} task added`);
    } else {
        console.log("Please add a task");
    }
}

// FUNCTION REMOVE will remove tasks from you existing list

function remove(text) {
    if (text.trim().split(" ")[1]) {
        var n = text.trim().split(" ")[1];
        var b = tasks.length;
        for (let i = 0; i < tasks.length; i++) {
            if (i == n - 1) {
                tasks.splice(i, 1);
                console.log(`task ${n} removed`);
            }
        }
        if (b === tasks.length) {
            console.log(`task ${n} does not exist`);
        }
    } else {
        tasks.pop();
        console.log("last task removed");
    }
}

// FUNCTION EDIT will edit tasks in your current list

function edit(text) {
    var task = text.trim().split(" ");
    task.shift();
    if (isNaN(Number(task[0]))) {
        task = task.join(" ");
        if (task.trim()) {
            tasks[tasks.length - 1].task = task;
            console.log(`task edited to ${task}`);
            list();
        } else {
            console.log("Please edit an existing task");
        }
    } else {
        let n = Number(task[0]);
        task.shift();
        task = task.join(" ");
        if (task.trim()) {
            if (n <= tasks.length) {
                tasks[n - 1].task = task;
                console.log(`task ${n} is edited to ${task}`);
                list();
            } else {
                console.log("number of task does not exist");
            }
        } else {
            console.log("Please edit an existing task");
        }
    }
}

// FUNCTION CHECK will allow you to check the task you want in your list

function check(text) {
    var task = text.trim().split(" ");
    task.shift();
    if (isNaN(Number(task[0]))) {
        console.log("Please enter the number of the task you'd loke to check");
    } else {
        let n = Number(task[0]);
        tasks[n - 1].status = true;
        console.log(`Checked task ${n}`);
        list();
    }
}

// FUNCTION UNCHECK will allow you to uncheck tasks from you current list

function uncheck(text) {
    var task = text.trim().split(" ");
    task.shift();
    if (isNaN(Number(task[0]))) {
        console.log(
            "Please enter the number of the task you'd like to uncheck"
        );
    } else {
        let n = Number(task[0]);
        tasks[n - 1].status = false;
        console.log(`Task ${n} unchecked`);
        list();
    }
}
// The following line starts the application
startApp("Ahmad Ghazzi");
