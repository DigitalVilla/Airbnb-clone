const Rental = require('../models/Rental');
const User = require('../models/User');

class db {
  constructor() {
    this.rentals = [{
        title: "Nice view on ocean",
        address: "Main street",
        postalCode: "123456",
        city: "San Francisco",
        state: 'CA',
        country: 'USA',
        category: "condo",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        address: "Time Square",
        postalCode: "343456",
        city: "New York",
        state: 'NY',
        country: 'USA',
        category: "apartment",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        address: "Banicka 1",
        postalCode: '654123',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        category: "house",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }
    ];

    this.users = [
      "VanillaTest",
      "AlexaTest",
      "MaiaTest",
      "EliTest",
    ]
  }

  async cleanDB() {
    // await User.deleteMany({});
    // await Rental.deleteMany({});
  }

  pushRentals() {
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.save()

    })
  }

  pushData() {
    const u = new User({
      username: 'Villanueva',
      password: 'Villanueva',
      email: 'Villanueva@mail.com'
    })

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = u;

      u.rentals.push(newRental);
      newRental.save()
    });

    u.save();
  }


  pushUsers() {
    this.users.forEach((user) => {
      const newUser = new User({
        username: user,
        email: user + '@mail.com',
        password: user
      });
      newUser.save()
    })
  }

  seedDB() {
    this.cleanDB();
    //  this.pushData();
    this.pushUsers();
    // this.pushRentals();
  }
}

module.exports = db;