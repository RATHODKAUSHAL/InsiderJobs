import { Webhook } from "svix";

// API Controller Function to manage Clerk User with database
export const ClerkWebHooks = async (req, res) => {
  try {
    //create a Svix instance with clerk webhook secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // verifying headers
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //Getting dtaa from request body
    const { data, type } = req.body;

    //  switch cases for different Events
    switch (key) {
      case "user.created": {
        // Create a new user in the database
        const userData = {
            _id:data.id,
            email: data.email_addresses[0].email_address,
            name : data.first_name + " " + data.last_name,
            image : data.image_url,
            resume : ''
        }
        await User.create(userData)
        res.json({})
        break;
      }

      case "user.updated": {
        // Update an existing user in the database
        const userData = {
            email: data.email_addresses[0].email_address,
            name : data.first_name + " " + data.last_name,
            image : data.image_url,
        }
        await User.findByIdAndUpdate(data.id,userData)
        res.json({})
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id)
        res.json({})
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.json({success:false, message:'WebHooks, Error'})
  }
};
