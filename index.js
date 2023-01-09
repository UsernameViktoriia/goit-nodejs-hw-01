const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        console.log(contactById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        const delContact = await removeContact(id);
        console.log(delContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
