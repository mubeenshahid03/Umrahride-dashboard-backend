const express = require("express");
const router = express.Router();
//const fetchuser=require("../Middleware/fetchuser")
const Vehicle = require("../Model/Vehicle");
const Package = require("../Model/Package");
const Pricing = require("../Model/Pricing");
const Destination = require("../Model/Destination");
const Booking = require("../Model/Booking");
const User = require("../Model/User");
const Contacts = require("../Model/Contacts");
const Admin = require("../Model/Admin");

//this file contains routes of vehicles,packages,locations,bookings,contacts,bookingstatus,packagesfairs in vehicles

// path 1   http://localhost:7000/api/vehicles/addvehicle
router.post("/addvehicle", async (request, response) => {
  try {
    const { name, imgURL, cartype, seats, bags, doors, price, userid } =
      request.body;
    console.log("i am from add vehicle path");
    let vehicle = new Vehicle({
      name,
      imgURL,
      cartype,
      seats,
      bags,
      doors,
      price,
      userid,
    });
    let savedData = await vehicle.save();
    response.status(200).json(savedData);

    // let name=request.body.name
    // response.send(name)
  } catch (error) {
    console.log("error from backend /api/vehicles/addvehicle" + error);
  }
});

// path 2   http://localhost:7000/api/vehicles/deletevehicle/_id
router.post("/deletevehicle/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let id = request.params.id;
    let vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return response.status(404).json({ error: "Vehicle not found" });
    } else {
      return response
        .status(200)
        .json({ message: `vehicle with id ${id} deleted successsfully ` });
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/deletevehicle/_id" + error);
  }
});

// path 3   http://localhost:7000/api/vehicles/editvehicle/_id
router.put("/editvehicle/:id", async (request, response) => {
  try {
    let { name, cartype, seats, bags, doors, price, userid, imgURL } =
      request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }
    let newVehicle = {};
    if (
      name ||
      cartype ||
      seats ||
      bags ||
      doors ||
      price ||
      userid ||
      imgURL
    ) {
      newVehicle.name = name;
      newVehicle.cartype = cartype;
      newVehicle.seats = seats;
      newVehicle.bags = bags;
      newVehicle.doors = doors;
      newVehicle.price = price;
      newVehicle.imgURL = imgURL;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      request.params.id,
      { $set: newVehicle },
      { new: false }
    );
    if (!updatedVehicle) {
      return response.status(400).json({ error: "error in vehicle updation" });
    } else {
      return response.status(200).json(updatedVehicle);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/editvehicle/_id" + error);
  }
});

// path 4   http://localhost:7000/api/vehicles/fetchallvehicles?_id
router.get("/fetchallvehicles/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "userid not enter in params" });
    } else {
      let fetchVehicles = await Vehicle.find({ userid: request.params.id });
      response.status(200).json(fetchVehicles);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/fetchallvehicles" + error);
  }
});

// path 5   http://localhost:7000/api/vehicles/filtervehicles/:name
router.get("/filtervehicles/:name", async (request, response) => {
  try {
    if (!request.params.name) {
      return response
        .status(400)
        .json({ error: "car name not enter in params" });
    } else {
      // console.log(request.body.name)
      let fetchVehicles = await Vehicle.find({ cartype: request.params.name });
      // console.log(fetchVehicles)
      response.status(200).json(fetchVehicles);
    }
  } catch (error) {
    console.log(
      "error from backend /api/vehicles/filtervehicles/:name" + error
    );
  }
});

//bellow are the routes for packages

// path 1   http://localhost:7000/api/vehicles/addpackage
router.post("/addpackage", async (request, response) => {
  try {
    const { title, description, vehicleid, price } = request.body;
    console.log("i am from add package path");
    let package = new Package({
      title,
      description,
      vehicleid,
      price,
    });
    let savedData = await package.save();
    response.status(200).json(savedData);

    // let name=request.body.name
    // response.send(name)
  } catch (error) {
    console.log("error from backend /api/vehicles/addpackage" + error);
  }
});
// path 2   http://localhost:7000/api/vehicles/getallpackages
router.get("/getallpackages", async (request, response) => {
  try {
    const packages = await Package.find();
    response.send(packages);
  } catch (error) {
    console.log("error in api/vehicles/getallpackages" + error);
  }
});

// path 3   http://localhost:7000/api/vehicles/editpkg/_id
router.put("/editpkg/:id", async (request, response) => {
  try {
    let { title, description, vehicleid, price } = request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }
    let newPkg = {};
    if (title || description || vehicleid) {
      (newPkg.title = title), (newPkg.description = description);
      newPkg.vehicleid = vehicleid;
      newPkg.price = price;
    }

    const updatedpkg = await Package.findByIdAndUpdate(
      request.params.id,
      { $set: newPkg },
      { new: false }
    );
    if (!updatedpkg) {
      return response.status(400).json({ error: "error in package updation" });
    } else {
      return response.status(200).json(updatedpkg);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/editpkg/_id" + error);
  }
});
// path 4   http://localhost:7000/api/vehicles/deletepkg/_id
router.post("/deletepkg/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let id = request.params.id;
    let pkg = await Package.findByIdAndDelete(id);
    if (!pkg) {
      return response.status(404).json({ error: "package not found" });
    } else {
      return response
        .status(200)
        .json({ message: `package with id ${id} deleted successsfully ` });
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/deletepkg/_id" + error);
  }
});

//bellow are the call for locations

// path 1   http://localhost:7000/api/vehicles/getalllocations
router.get("/getalllocations", async (request, response) => {
  try {
    // Fetch all locations
    const locations = await Pricing.find();

    // Populate details for each location
    const locationsWithDetails = await Promise.all(
      locations.map(async (location) => {
        const destination = await Destination.findOne({
          _id: location.destinationid,
        });
        // Assuming there's a reference to vehicleId in Pricing model
        const vehicle = await Vehicle.findOne({ _id: location.vehicleid });

        return {
          _id: location._id,
          to: location.to,
          from: location.from,
          destination,
          vehicle,
          __v: location.__v,
        };
      })
    );

    // Send the locations with details as response
    response.send(locationsWithDetails);
  } catch (error) {
    console.log("Error in api/vehicles/getalllocations: " + error);
    response.status(500).send({ error: "Server error" });
  }
});
// path 2   http://localhost:7000/api/vehicles/addlocations
router.post("/addlocations", async (request, response) => {
  try {
    const { vehicleid, destinationid, price } = request.body;

    let location = new Pricing({
      vehicleid,
      destinationid,
      price,
    });
    let savedData = await location.save();
    response.status(200).json(savedData);

    // let name=request.body.name
    // response.send(name)
  } catch (error) {
    console.log("error from backend /api/vehicles/addlocation" + error);
  }
});
// path 3   http://localhost:7000/api/vehicles/editlocation/:id
router.put("/editlocation/:id", async (request, response) => {
  try {
    let { vehicleid, destinationid, price } = request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }
    let newlocation = {};
    if (vehicleid || destinationid || price) {
      (newlocation.vehicleid = vehicleid),
        (newlocation.destinationid = destinationid),
        (newlocation.price = price);
    }
    //console.log(newlocation)
    //console.log(request.params.id)
    const updatedlocation = await Pricing.findByIdAndUpdate(
      request.params.id,
      { $set: newlocation },
      { new: false }
    );
    if (!updatedlocation) {
      return response.status(400).json({ error: "error in location updation" });
    } else {
      return response.status(200).json(updatedlocation);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/editlocation/_id" + error);
  }
});
// path 4   http://localhost:7000/api/vehicles/deletelocation/:id
router.post("/deletelocation/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let id = request.params.id;
    let location = await Pricing.findByIdAndDelete(id);
    if (!location) {
      return response.status(404).json({ error: "pricing location not found" });
    } else {
      return response
        .status(200)
        .json({
          message: `pricing location with id ${id} deleted successsfully `,
        });
    }
  } catch (error) {
    console.log(
      "error from backend /api/vehicles/deletelocationpricing/_id" + error
    );
  }
});
// below are the calls for fetching data for home components
// path 1   http://localhost:7000/api/vehicles/gethomedata
router.get("/gethomedata", async (request, response) => {
  try {
    const [packages, users, admins, vehicles, bookings, contacts] =
      await Promise.all([
        Package.find().countDocuments(),
        User.find().countDocuments(),
        Admin.find().countDocuments(),
        Vehicle.find().countDocuments(),
        Booking.find().countDocuments(),
        Contacts.find().countDocuments(),
      ]);

    const totalLength = [packages, users, bookings, admins, vehicles, contacts];
    response.send(totalLength);
  } catch (error) {
    console.log("error in api/vehicles/gethomedata" + error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//bellow are the call for bookings

// path 1   http://localhost:7000/api/vehicles/getallbookings
router.post("/getallbookings", async (request, response) => {
  try {
    //     const userid = request.user.id;
    // console.log(userid);

    // Find bookings associated with the user
    const bookings = await Booking.find();
    // console.log(bookings);

    // Iterate through each booking and fetch additional data
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        console.log(booking);
        const destination = await Destination.findOne({
          _id: booking.destinationId,
        });
        const vehicle = await Vehicle.findOne({ _id: booking.vehicleId });
        const user = await User.findOne({ _id: booking.userid });
        const pricing = await Pricing.findOne({
          destinationid: booking.destinationId,
          vehicleid: booking.vehicleId,
        });
        let pkg = null;
        if (booking.isPackage === true) {
          pkg = await Package.findOne({ _id: booking.packageId });
        } else {
          pkg = "notfound";
        }
        return {
          _id: booking._id,
          userid: booking.userid,
          datepicker: booking.datepicker,
          timepicker:booking.timepicker,
          hotel_name: booking.hotel_name,
          comments: booking.comments,
          isPackage: booking.isPackage,
          packageId: booking.packageId,
          bookingstatus: booking.bookingstatus,
          destination,
          vehicle,
          user,
          pricing,
          pkg,
          price: booking.price,
          __v: booking.__v,
        };
      })
    );

    // console.log(bookingsWithDetails);
    response.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.log("error from backend /api/vehicles/getallbookings" + error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// path 2 http://localhost:7000/api/vehicles/delbooking
router.post("/delbooking", async (request, response) => {
  try {
    // console.log(request.body)
    if (!request.body.bookingid) {
      response.status(401).json({ error: "body not received" });
    }

    const booking = await Booking.findByIdAndDelete(request.body.bookingid);
    if (!booking) {
      response.status(404).json({ error: "id not found" });
    } else {
      response.status(200).json(booking);
    }
  } catch (error) {
    console.log(
      "error from backend http://localhost:7000/api/vehicles/delbooking" + error
    );
  }
});

// path 3   http://localhost:7000/api/vehicles/getsortedbookings
router.post("/getsortedbookings", async (request, response) => {
  try {
    let bookings = await Booking.find();
    const sortedbookings = bookings.sort((a, b) => {
      let dateA = new Date(a.datepicker);
      let dateB = new Date(b.datepicker);
      return dateB - dateA; // Sort in descending order, use dateB - dateA for descending
    });
    // functionality for handle todays booking
    const currentDate = new Date(); // Current date
    const tomorrowDate = new Date(currentDate.getTime());
    tomorrowDate.setDate(currentDate.getDate() + 1); // Tomorrow's date
    const todaybookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.datepicker); // Convert booking date string to Date object
      if (
        currentDate.getDate() === bookingDate.getDate() ||
        tomorrowDate.getDate() === bookingDate.getDate()
      ) {
        console.log(bookingDate.getDate());
        return bookingDate.getDate();
      } // Compare today and tomorrow's date with booking date
    });

    bookings = sortedbookings.splice(0, 10);
    const cardData = [
      { title: "Packages", tag: "10", icon: "package" },
      { title: "Users", tag: "100", icon: "user" },
      { title: "Admins", tag: "1", icon: "laptop" },
      { title: "Vehicles", tag: "7", icon: "vehicle" },
      { title: "Bookings", tag: "96", icon: "booking" },
      { title: "Contacts", tag: "21", icon: "contact" },
      { title: "Reviews", tag: "0", icon: "review" },
      { title: "Admin Notif", tag: "0", icon: "adminnotif" },
    ];

    async function fetchCounts() {
      const [
        packagesCount,
        usersCount,
        adminsCount,
        vehiclesCount,
        bookingsCount,
        contactsCount,
      ] = await Promise.all([
        Package.find().countDocuments(),
        User.find().countDocuments(),
        Admin.find().countDocuments(),
        Vehicle.find().countDocuments(),
        Booking.find().countDocuments(),
        Contacts.find().countDocuments(),
      ]);

      return {
        Packages: packagesCount,
        Users: usersCount,
        Admins: adminsCount,
        Vehicles: vehiclesCount,
        Bookings: bookingsCount,
        Contacts: contactsCount,
      };
    }

    fetchCounts().then((counts) => {
      cardData.forEach((card) => {
        switch (card.title) {
          case "Packages":
            card.tag = counts.Packages;
            break;
          case "Users":
            card.tag = counts.Users;
            break;
          case "Admins":
            card.tag = counts.Admins;
            break;
          case "Vehicles":
            card.tag = counts.Vehicles;
            break;
          case "Bookings":
            card.tag = counts.Bookings;
            break;
          case "Contacts":
            card.tag = counts.Contacts;
            break;
          default:
            break;
        }
      });

      //console.log(cardData);
    });

    // Iterate through each booking and fetch additional data
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const destination = await Destination.findOne({
          _id: booking.destinationId,
        });
        const vehicle = await Vehicle.findOne({ _id: booking.vehicleId });
        const user = await User.findOne({ _id: booking.userid });
        const pricing = await Pricing.findOne({
          destinationid: booking.destinationId,
          vehicleid: booking.vehicleId,
        });

        let pkg = null;
        if (booking.isPackage === true) {
          pkg = await Package.findOne({ _id: booking.packageId });
        } else {
          pkg = "notfound";
        }
        return {
          _id: booking._id,
          userid: booking.userid,
          datepicker: booking.datepicker,
          timepicker:booking.timepicker,
          hotel_name: booking.hotel_name,
          comments: booking.comments,
          isPackage: booking.isPackage,
          packageId: booking.packageId,
          destination,
          vehicle,
          user,
          pricing,
          cardData,
          todaybookings,
          pkg,
          price: booking.price,
          __v: booking.__v,
        };
      })
    );

    //console.log(bookingsWithDetails);
    response.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.log("error from backend /api/vehicles/getallbookings" + error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

///bellow are the requests for fetchcontacts

// path 1   http://localhost:7000/api/vehicles/fetchallcontacts
router.get("/fetchallcontacts", async (request, response) => {
  try {
    let contacts = await Contacts.find({ userid: request.params.id });
    response.status(200).json(contacts);
  } catch (error) {
    console.log("error from backend /api/vehicles/fetchallcontacts" + error);
  }
});

//handle bookingstatus
//http://localhost:7000/api/vehicles/editbookingstatus
router.post("/editbookingstatus", async (request, response) => {
  try {
    const { bookingstatus, bookingid } = request.body;
    let booking = await Booking.findOne({ _id: bookingid });
    booking.bookingstatus = bookingstatus;
    let savedData = await booking.save();
    response.status(200).json(savedData);

    // let name=request.body.name
    // response.send(name)
  } catch (error) {
    console.log("error from backend /api/vehicles/editbookingstatus" + error);
  }
});

//below are the request for packages fair in vehicle.js
// path 1   http://localhost:7000/api/vehicles/fetchpkgsfair/_id
router.post("/fetchpkgsfair/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let vehicleId = request.params.id;
    let packages = await Package.find({ vehicleid: vehicleId });

    if (!packages) {
      return response
        .status(401)
        .json({ error: "bookings against this vehicleid not found" });
    }
    response.status(200).json({ packages });
  } catch (error) {
    console.log("error from backend /api/vehicles/fetchpkgsfair/_id" + error);
  }
});
// path 2   http://localhost:7000/api/vehicles/editpkgsfair/_id
router.put("/editpkgsfair/:id", async (request, response) => {
  try {
    const { title, description, price, vehicleid } = request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let pkgId = request.params.id;
    let newpkg = {};
    if (title || description || price | vehicleid) {
      newpkg.title = title;
      newpkg.description = description;
      newpkg.price = price;
      newpkg.vehicleid = vehicleid;
    }
    const updatedPkg = await Package.findByIdAndUpdate(
      pkgId,
      { $set: newpkg },
      { new: false }
    );
    if (!updatedPkg) {
      return response
        .status(401)
        .json({ error: "package could not been update" });
    }

    response.status(200).json({ updatedPkg });
  } catch (error) {
    console.log("error from backend /api/vehicles/fetchpkgsfair/_id" + error);
  }
});
// path 3   http://localhost:7000/api/vehicles/deletepkgsfair/_id
router.delete("/deletepkgsfair/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let pkgId = request.params.id;

    const deletedPkg = await Package.findByIdAndDelete(pkgId);
    if (!deletedPkg) {
      return response.status(401).json({ error: "package has been deleted " });
    }

    response.status(200).json({ deletedPkg });
  } catch (error) {
    console.log("error from backend /api/vehicles/deletepkgsfair/_id" + error);
  }
});
// path 4   http://localhost:7000/api/vehicles/addpkgsfair
router.post("/addpkgsfair", async (request, response) => {
  try {
    const { title, description, vehicleid, price } = request.body;

    let package = new Package({
      title,
      description,
      vehicleid,
      price,
    });
    let savedData = await package.save();
    response.status(200).json(savedData);
  } catch (error) {
    console.log("error from backend /api/vehicles/addpkgsfair" + error);
  }
});

// bellow are the calls for fetchlocationsfair
//path 1 http://localhost:7000/api/vehicles/fetchlocationsfair/:id
router.post("/fetchlocationsfair/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let vehicleId = request.params.id;
    let locations = await Pricing.find({ vehicleid: vehicleId });

    if (!locations) {
      return response
        .status(401)
        .json({ error: "locations against this vehicleid not found" });
    }

    const locationsWithDetails = await Promise.all(
      locations.map(async (location) => {
        const destination = await Destination.findOne({
          _id: location.destinationid,
        });
        const vehicle = await Vehicle.findOne({ _id: vehicleId });
        return {
          _id: location._id,
          price: location.price,
          vehicle,
          destination,

          __v: location.__v,
        };
      })
    );
    response.status(200).json({ locationsWithDetails });
  } catch (error) {
    console.log(
      "error from backend /api/vehicles/fetchlocationsfair/_id" + error
    );
  }
});

//path 1 for fetching destinations
// http://localhost:7000/api/vehicles/fetchdestinations
router.get("/fetchdestinations", async (request, response) => {
  try {
    let fetchdestiantions = await Destination.find();
    response.status(200).json(fetchdestiantions);
  } catch (error) {
    console.log(
      "error from backend /api/destinations/fetchdestination" + error
    );
    response.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
