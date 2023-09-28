const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb+srv://ogonna:60388449oO@cluster0.trpt1dx.mongodb.net/?retryWrites=true&w=majority";
  
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await listDatabases(client);

    // await createListing(client, {
    //   name: "Apple",
    //   quantity: 10,
    //   Name: "Green"
    // });

    // await createMultipleListings(client, [
    //   {
    //     name: "Mango",
    //     quantity: 20,
    //     Name: "Green"
    //   },
    //   {
    //     name: "Strawberry",
    //     quantity: 15,
    //     Name: "Red"
    //   },
    //   {
    //     name: "Banana",
    //     quantity: 25,
    //     Name: "Yellow"
    //   }
    // ]);

    // await findOneListingByName(client, "Mango");

    // await findMultipleListingByName(client, quantityOfListing = 15);

    // await updateListingByName(client, "Mango", {name: "Coconut", quantity: 30, Name: "Brown"});

    // await updateAllListingByName(client);

    // await deleteListingByName(client, "Red");

    await deleteMultipleListingsByName(client, 10)

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  } 

}

main().catch(console.error);// with this block of code the mongodb server will get connected to your node js

async function deleteMultipleListingsByName(client, quantityOfListing) {
  const result = await client.db("newListings").collection("NamesOfFruits").deleteMany({quantity: {$gt: quantityOfListing}});
  // the deleteMultipleListingsByName async function is to delete one object in o document because it has the deleteMany method

  console.log(`${result.deletedCount} has been deleted from the list`);
}

async function deleteListingByName(client, colorOfListing) {
  const result = await client.db("newListings").collection("NamesOfFruits").deleteOne({color: colorOfListing});
  // the deleteListingByName async function is to delete one object in o document because it has the deleteOne method

  console.log(`${result.deletedCount} has been deleted from the list`);
}

async function updateAllListingByName(client) {
  const result = await client.db("newLiistings").collection("NamesOfFruits").updateMany({price: {$exists: false}}, {$set: {price: "$50"}});
  // the updateAllListingByName async function is to update many object in a document because it has the updateMany method

  console.log(`${result.matchedCount} these are the documents that matched the query criteria`);
  console.log(`${result.modifiedCount} these documents just got updated`);
}

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client.db("newLiistings").collection("NamesOfFruits").updateOne({name: nameOfListing}, {$set: updatedListing});
  // the updateListingByName async function is to update one object in a document because it has the updateOne method

  console.log(`${result.matchedCount} these are the documents that matched the query criteria`);
  console.log(`${result.modifiedCount} these documents just got updated`);
}

async function findMultipleListingByName(client, quantityOfListing) {
  const result = client.db("newListings").collection("NamesOfFruits").find({quantity: {$gt: quantityOfListing}}).sort({quantity: 1});
   // the findMultipleListingByName async function is to read documents for multiple objects because it has the find method

  if(result) {
    console.log(`found a listing in the collection with the name '${quantityOfListing}'`);
    await result.forEach(doc => console.log(doc))
  }else{
     console.log(`no listing is found with the name '${quantityOfListing}'`);
  }
}

async function findOneListingByName(client, nameOfListing) {
  const result = client.db("newListings").collection("NamesOfFruits").findOne({name: nameOfListing});
  // the findOneListingByName async function is to read documents for one object because it has the findOne method

  if(result) {
    console.log(`found a listing in the collection with the name '${nameOfListing}'`);
    console.log(result);
  }else{
     console.log(`no listing is found with the name '${nameOfListing}'`);
  }
}

async function createMultipleListings(client, newListings) {
  const result = await client.db("newListings").collection("NamesOfFruits").insertMany(newListings);
   // the createMultipleListings async function is to create documents for many objects because it has the insertMany method

  console.log(`${result.insertedCount} new listings created with the following id(s)`);

  console.log(result.insertedIds);
};

async function createListing(client, newListing) {
  const result = await client.db("newList").collection("NameOfFruit").insertOne(newListing);
   // the createListing async function is to create document for only one object because it has the insertOne method

  console.log(`New listing created with the following id ${result.insertedId}`);
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("databases:");
  databasesList.databases.forEach(db => {
    console.log(`-${db.name}`);
  });
}