const Contact = require("./../../models/Contact.model")

exports.store = async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    })
    await contact.save();
    return res.status(200).json({ data: contact, status : 200 });
};
