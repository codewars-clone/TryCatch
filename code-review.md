# Second Code Review Notes

## UX Considerations

- Include non-binary to your gender lists
- Think about adding badges that note the number of "awaits" you have
- When two people match, think about using a toast notification to notify both parties
- Another way is to create a "notifications queue" component (and subsequently a new menu option) that does the previous 2 points

## Code Considerations

- Redux adds a layer of abstraction that can over complicate your logic
- You have a monstrous switch case statement that can possibly be refactored. Think about using history.

## Data Considerations

- Remember: Users liking other users is just a list or map of users; you might not necessarily need a new collection for that
- For something like Firestore, bias on the side of "many collections; small documents" data organization style

## Communication Considerations

- When "onboarding" be specific on how certain things work; don't just say, "This code does this and just scroll on". Remember: you were juniors once, too so be mindful of how you explain things.

## Other Considerations

### Relational databases are good for

- More static data (think order history)
- Really complex relationships
- Really complex queries
- Good for writing data (generally)

Remember: Schemas in relational databases are predefined. If you need to change the schema, you're going to have to drop your tables and do a lot of code refactoring.

In addition, you don't want to use higher order data types such as arrays or JSON objects if you don't have to. If you're thinking arrays, then you most likely want thru/join/junction tables. In addition, arrays can violate something called "normalization" of data in relational databases. Normalization is a massive concept but to oversimplify it, it's data that is not redundant. See NoSQL explanation of redundancy.

### NoSQL databases are good for

- Really dynamic data (think Trello)
- Good for reading data (generally)
- Needing flexibility with your data
- Updating your schema "on the fly"

I mentioned above about normalization which is data that is not rednundant or repeated. NoSQL's "superpower" is redundancy. It doesn't matter if you have to duplicate data across many different collection (Ex: users array on 3 different collections that need users "relationship"). In a relational database, you want to minimize redundant data through relationships.

### Things we didn't get to

Since the data analysis part of the code review ran long, I didn't get to something I like to call "Defend the Stack". So, we did a little bit of it of figuring out when to use NoSQL vs. SQL and also a little bit into the use cases of Redux. See below for other questions/ideas we would have discussed if we had time:

- What is React and why do we use it? What does it give us over plain JavaScript?
- Redux vs. Local State and why
- Playing off the whole "CTO" angle making you take off Firestore, if we were to use PostgreSQL as our data, we would need to define routes, so what will some our endpoints look like?
- What is Express? What does it do for us?

### Other Resources

- [Firestore Data Modeling: 5 Cool Techniques](https://www.youtube.com/watch?v=35RlydUf6xo)
- [How to Structure Your Data | Get to Know Cloud Firestore #5](https://www.youtube.com/watch?v=haMOUb3KVSo)
- [Model Relational Data in Firestore](https://www.youtube.com/watch?v=jm66TSlVtcc)