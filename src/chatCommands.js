module.exports = async function (msg) {
    let tokens = msg.content.split(" ");
    let command = tokens[0];
    if (command.charAt(0) === global.prefix) {
        console.log("WORKED WHOHO")
    }
}