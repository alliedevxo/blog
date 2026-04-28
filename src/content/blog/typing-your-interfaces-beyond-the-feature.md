---
title: "Typing your interfaces beyond the feature"
description: "Best practices of typing your code. Type for the resource and not the feature"
tags: ["TypeScript", "Best Practices"]
date: 2025-11-24
draft: false
excerpt: "Best practices of typing your code. Type for the resource and not the feature"
est_duration_min: "15"
---

I primarily write TypeScript, so I am going to use interfaces in TS for my code examples. But the underlying concept is the same whether it’s Java classes, zod, or whatever else you are using to type your code.

To demonstrate how I like to type interfaces, I am going to walk through an example as if I was coding this at work. That way we have some code to reference and see good/bad patterns.

## Problem setup:

Our team works for a company that sells software that handles issue tracking. Customers can create tickets that get sent off to the customer’s QA team.

Our team is working on a feature where we pull ticket data from an API endpoint and display the results in a dashboard that lists tickets in priority order. The API is maintained by another team at our company, and the structure is set.

You and I are pairing on a ticket where we need to create interfaces for the incoming data from the API.

#### Endpoints we need to support:

1. GET /api/tickets
   - For getting all tickets
2. GET /api/tickets/:id
   - For getting a specific ticket
3. PATCH /api/tickets/:id
   - For updating a specific ticket (like its title or status)
4. GET /api/tickets/status
   - Get a list of valid statuses

A payload for /api/tickets/:id looks like:

```ts
{
  id: string,
  title: string,
  status:{
    id: string,
    description: string
  },
  createdOn: string,
  updatedOn: string,
  relatedTickets: string[],
  notes: {
    id: string,
    note: string
  }[],
  reporter: {
    id: string,
    name: string
  },
  assignee: {
    id: string,
    name: string
  }
}
```

### Take a stab at typing this payload:

Simple enough! We could just put that type directly into an interface called Ticket. Ex:

```ts
export interface Ticket {
  id: string;
  title: string;
  status: {
    id: string;
    description: string;
  };
  createdOn: string;
  updatedOn: string;
  relatedTickets: string[];
  notes: {
    id: string;
    note: string;
  }[];
  reporter: {
    id: string;
    name: string;
  };
  assignee: {
    id: string;
    name: string;
  };
}
```

This is the first mistake I often see. It’s technically correct. A ticket has all of those fields and if we typed it like that, there’s no issue with the code.

What happens when later we have another type with a person with the id, name fields? Currently there’s nothing reusable here, so we would have to retype it.

Ex: Reporter and assignee have the same type, but duplicated

Maybe we have overcomplicated it anyway, because we don’t even use all of these fields.

1. Our MVP for the dashboard does not have a section for related tickets.
2. Because we only show time to completion, we also don’t care about updatedOn.
3. We would also never update the reporter for the ticket, so we can just keep the display name and remove the ID

We could do:

```ts
export interface Ticket {
  id: string;
  title: string;
  status: {
    id: string;
    description: string;
  };
  createdOn: string;
  notes: {
    id: string;
    note: string;
  }[];
  reporter: {
    name: string;
  };
  assignee: {
    id: string;
    name: string;
  };
}
```

A few notes:
Just because we don’t care about that data right now, we just lost any information that those types were ever there. If we extend our dashboard in the future, we now have to go check the Swagger to see if there are more types available.
We still have a problem of duplication in the types.
Now reporter and assignee, which are the same type from the API, are two different types (or you could say reporter is a partial assignee).

I wanted to call out those two scenarios, because they are the most common antipatterns I see with typing. The first one does not separate types into reusable chunks and the second one makes the type very coupled to the feature.

Let’s consider how backends typically work. Usually, everything is typed into resources, which are stored in a database, normalized to reduce redundancy, and those resources are composed to create an api response.

For our backend, there is probably a concept of a person, a ticket, a note, a status. And those are most likely stored in a relational database (obviously making some assumptions here, the backend could look like anything).

I like to type my features with that normalization in mind, because when we use the same backend for future features, the data will most likely follow the same patterns and we can reuse types where they make sense.

This will:

1. Reduce duplication
2. Make future features easier to conceptualize, because we know the resources being returned
3. Help us figure out what fields are core to the specific feature
4. Help us type functions appropriately when they are more specific to feature parts.
   - Ex: If I make an assignee avatar component, rather than passing in the entire Ticket object, I can pass in a Person object

Let’s start breaking down Ticket, and then we can move on to the other types.

```ts
export interface Ticket {
  id: string;
  title: string;
  status: Status;
  createdOn: string;
  updatedOn: string;
  relatedTickets: string[];
  notes: Note[];
  reporter: Person;
  assignee: Person;
}

export interface Person {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  note: string;
}

export interface Status {
  id: string;
  description: string;
}
```

Now we have `Ticket`, `Person`, `Note`, and `Status` into reusable chunks.

Before we move on, it’s important to note that these should all live in their appropriate locations in the code. For example, you don’t want to put all of these types in a ticket.d.ts file and then if an unrelated feature uses Person, you have to either duplicate it or import the ticket types. Make sure to organize the types where it makes sense.

`Person` is much more generic than `Ticket`, so `Ticket` can import `Person` from wherever it makes sense.

Now that we have those base types, let’s move onto Tickets. That’s easy!

```ts
export interface Tickets {
  tickets: Ticket[];
  page: number;
  total: number;
}
```

We can reuse the `Ticket` interface for this one, rather than duplicating the entire ticket structure.

When we move onto the status endpoint, we already have the Status type. So getting all statuses probably looks like:

`export type Statuses = Status[]`

Or we can just use an array of statuses like `Status[]` in the code. We can also use interface if there are more details on the payload, such as:

```ts
export interface Statuses {
  statuses: Status[];
  total: number;
}
```

For our `PATCH` operation, this is where the types being separated really comes in handy.

When we patch a resource, we are updating a part of that resource, and do not need to send in the entire payload.

So if we have functions for updating different parts of the resource, we can just pass in that specific type.

Example passing in the entire new ticket object:

```ts
async function updateTicketStatus(ticket: Ticket) {
  // code to PATCH the ticket with a new status
}
```

This makes it so the function could technically update any part of the ticket and not just the status. It also might have unintended side effects because we are modifying the ticket object.

Example passing in the more specific types:

```ts
async function updateTicketStatus(ticketId: string, newStatus: Status) {
  // code to PATCH the ticket with a new status
}
```

This makes it so we are isolating the update to only the status, and we are not modifying the underlying ticket object. The ticket object should be read only to avoid any unintended side effects.

You can imagine other functions for updating the assignee, adding/removing/updating notes, etc.

---

## Future feature that reuse these types

Let’s say in the future, we are now working on a new feature together where we need to create a User Profile page. This page displays user information when you click on their avatar or name on a ticket, or your own user info if you click on “My Profile”.

We have a new set of endpoints:

1. GET /user/:id
2. GET /user/me

Well, the type for Person can just be reused here. The server is going to query the database and return the user details for that particular ID. However, there will probably be more data associated with it.

For tickets, we had basic user details such as name, and ID. But that makes for a pretty lackluster profile page. Further, we don’t want the `Ticket` type to include all of a user’s profile information. That would be too much over the wire for every request!

### Bad examples

Let’s look at two examples that hurt my soul.

#### Option 1: Separating the types

The most important pattern to avoid is separating these types entirely, however. We want to avoid a situation like:

```ts
export interface Person {
  id: string,
  name: string
}

export interface UserProfile {
  id: string,
  name: string,
  email: string,
  timeZone: string,
  … // other profile fields
}
```

It might not seem like an issue right now, but consider a few points:

1. We have no idea how these types will evolve in the future
2. We have no idea what other developers are going to assume the types mean in the future
3. What if the name field changes to description? Or separates the name into first, last name fields? Now we have to update the type in multiple places
4. `UserProfile` is an awful name!! We requested a `User` from the database, not a `UserProfile`. `UserProfile` is a feature we are creating, not a resource.

These types are coupled together in the backend. What most likely happened was the id and name fields for the type came from the same table in the database, but Ticket had a trimmed down version of it to reduce the data over the wire.

We should keep them coupled!

#### Option 2: Make things optional

This option truly hurts when I see it. It’s so common, but pretty much makes typing things pointless.

```ts
export interface UserProfile {
  id: string,
  name: string,
  email?: string,
  timeZone?: string,
  … // other profile fields (all optional)
}
```

This is the lazy way of typing. It makes it so you only need to define a single type (Person can now be typed as User, because it contains none of the fields that are optional).

However, this makes downstream code very hard to reason about. If we are in the User Profile component, we have to add conditional logic for every single one of those fields, because they could be undefined. Except they aren’t and we already know they aren’t…

Further, using email as an example, every time we use it, we have to explicitly type it as `string | undefined`, instead of a `string`.

The rule of thumb for optional fields is that if we know they are present, they should never be optional in the type definition. It’s a huge antipattern and makes the rest of the code incredibly hard to reason about.

You may as well use `any`…

Ok! So I want to repeat myself one more time just in case. These options above are antipatterns and are not the way to go! I only included them because of how common they are in the code I’ve worked in.

### Better examples

Let’s look at some good code examples, with the types coupled together in a proper way.

There’s a few options to couple them together:

#### Option 1: Extend the interface

```ts
export interface Person {
  id: string,
  name: string
}

export interface User extends Person {
  email: string,
  timeZone: string,
  … // other profile fields
}
```

This keeps the types together and changing the Person interface will also change User. Although I don’t love `Person` and `User` now. There’s no clear distinction until you look at the interface definitions.

```ts
export interface UserReference {
  id: string,
  name: string
}

export interface User extends UserReference {
  email: string,
  timeZone: string,
  … // other profile fields
}
```

I like `UserReference` more, but there’s still something I don’t like about it. They do say the hardest part of programming is naming! I’m going to keep these names as-is for the purposes of this post.

#### Option 2: Type intersection

```ts
export type UserReference = {
  id: string,
  name: string
}

export type User = UserReference &  {
  email: string,
  timeZone: string,
  … // other profile fields
}
```

This is very similar to Option 1, but it is useful to call out just in case you have existing types (not interfaces) that already exist and you want to make it work without changing those types to interfaces.

#### Option 3: Partial Pick

```ts
export interface User {
  id: string,
  name: string,
  email: string,
  timeZone: string,
  … // other profile fields
}

export type UserReference = Pick<User, 'id' | 'name'>;
```

I have a love/hate relationship with TypeScript’s partials. However, in this case I really like it! In the previous example, I mentioned that I do not like the interface `UserReference`, because `User` extends it. It didn’t feel like `User` should extend a reference. Maybe I am being too pedantic.

However, it makes more sense to me that we want to take a `User` object and pick which fields we want for the reference to it.

One con with this approach is there is some duplication with needing to specify the fields in `Pick`. However, if the base type `User` changed, you will get a TypeScript compile error if those specific fields change.

All three options are fine to use, and they might make sense in different situations.

---

## Final types:

```ts
// In user.d.ts:
export interface User {
  id: string,
  name: string,
  email: string,
  timeZone: string,
  … // other profile fields
}

export type UserReference = Pick<User, 'id' | 'name'>;
```

```ts
// In ticket.d.ts
export interface Ticket {
  id: string;
  title: string;
  status: Status;
  createdOn: string;
  updatedOn: string;
  relatedTickets: string[];
  notes: Note[];
  reporter: UserReference;
  assignee: UserReference;
}

export interface Note {
  id: string;
  note: string;
}

export interface Status {
  id: string;
  description: string;
}
```

Clear and concise and we have multiple features using these types! We have a ticket dashboard, user avatar components, a user profile page, etc.

---

## Wrap up

We looked at a lot of examples on how to structure our types. We looked at examples that follow antipatterns, but unfortunately are so common in code. And then we looked at examples that more closely match the resources they represent.

When you are typing some code, I strongly recommend thinking in terms of resources and what those types truly represent. This will avoid types that are feature specific and extend well throughout your entire application.

As promised, these examples are in TypeScript, but the data organization concepts will transfer to whatever language you are writing in.

Focus on the concepts and not the specific code being used.

I hope this helps someone out there think about how to structure types in the future.

Happy coding!
