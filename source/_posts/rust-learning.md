---
title: Rust_Learning
tags:
  - Rust
  - 记录
categories:
  - 学习
date: 2023-07-18 16:25:21
excerpt: no panic
---
# Rust_Learning

**记录我的Rust学习**

## Cargo使用
```bash
cargo new
cargo build 
cargo run
cargo check
cargo doc --open #build documentation provided by all your dependencies locally and open it in your browser
```

## Rust特点
- Patterns and the match construct
- a strong, static type system.
- type inference
- shadow
- Rust uses the term panicking when a program exits with an error
- requiring type annotations in function definitions
- Rust's goal is to compile programs into efficient binaries that *require as few runtime checks as possible*
- A foundational goal of Rust is to ensure that your programs never have undefined behavior

## Chapter3 Common Programming Concepts
- constant v.s. variable
  1. Constants aren’t just immutable by default;they’re always immutable.
  2. Constants can be declared in any scope
  3. Constants may be set only to a constant expression, not the result of a value that could only be computed at runtime. 
- shadow ends until
  1. it itself is shadowed 
  2. the scope ends
- Integer division truncates toward zero to the nearest integer
- tuple和array区别
  1. tuple的各类型可以不同；
  2. array的大小固定,在定义时就指定了
  3. tuple更灵活,可存储不同类型,一般用于临时组合数据
  4. array大小固定,用于存储大量相同类型的数据
- expression and statement
  1. Expressions do not include ending semicolons
  2. statement does not return a value
  3. the return value of the function is synonymous with *the value of the final expression in the block of the body of a function*
- Control Flow
  1. This means the values that have the potential to be results from each arm of the if must be the same type
  2. Rust does not have a concept of "truthy" or "falsy" values.So *The condition to an if-expression must be a boolean*

## Chapter4 Understanding Ownship
- The stack holds data associated with a specific function, while the heap holds data that can outlive a function
- Rust does not allow programs to manually deallocate memory. That policy avoids the kinds of undefined behaviors shown above.
- Box deallocation principle : If a variable owns a box, when Rust deallocates the variable's frame, then Rust deallocates the box's heap memory.
- Moved heap data principle: if a variable x moves ownership of heap data to another variable y, then x cannot be used after the move.
- A reference is a kind of pointer.
- Rust implicitly inserts dereferences and references in certain cases, such as calling a method with the dot operator
- *Pointer Safety Principle*: data should never be aliased and mutated at the same time.
- Permissions are defined on *paths* and not just variables. A path is anything you can put on the left-hand side of an assignment.
- Creating a reference to data ("*borrowing*" it) causes that data to be temporarily read-only until the reference is no longer used.
- Rust's borrow checker does not contain different paths for a[0], a[1], and so on. It uses a single path a[_] that represents all indexes of a.
- Slices are special kinds of references because they are "fat" pointers, or pointers with metadata. Here, the metadata is the length of the slice.

### 总结
- 优势
  1. improving runtime performance by avoiding garbage collection
  2. improving predictability by preventing accidental "leaks" of data.
- Pointers can be created through 
  1. boxes (pointers owning data on the heap) 
  2. references (non-owning pointers).
- move v.s. borrow
  -  A move of a variable with a non-copyable type (like Box<T> or String) requires the RO permissions, and the move eliminates all permissions on the variable. That rule prevents the use of moved variables:
  - Borrowing a variable (creating a reference to it) temporarily removes some of the variable's permissions
    - An immutable borrow creates an immutable reference, and also *disables the borrowed data from being mutated or moved.*
    - A mutable borrow creates a mutable reference, which* disables the borrowed data from being read, written, or moved*
- use-after-free: *Immutable borrows* remove the W permission to avoid use-after-free,
- double-frees: Dereferences of references to non-copyable data do not have the O permission to avoid double-frees

## Chapter5 Struct
- Rust *does not have a keyword for constructor functions*. The idiomatic way to define a constructor function is to make an associated function called new, but that is not enforced by the language.
- tuple struct. e.g. `struct Color (i32,i32,i32);`
- Rust will insert as many references and dereferences as needed to make the types match up for the self parameter
- Rust does not auto-derive Copy for stability across API changes. `#[derive(Copy, Clone)]`
- when you see an error like "cannot move out of *self", that's usually because you're trying to call a self method on a reference like &self or &mut self. Rust is protecting you from a double-free

## Chapter6 Enum 
-  advantage to using an enum rather than a struct:
  1. each variant can have different types and amounts of associated data
  2. the name of each enum variant that we define also becomes a function that constructs an instance of the enum
  3. you can put any kind of data inside an enum variant: strings, numeric types, or structs, for example. You can even include another enum

- The Option Enum 
  1. the compiler can check whether you’ve handled all the cases you should be handling
  2. a null is a value that is currently invalid or absent for some reason.
  3. Rust does not have nulls, but it does have an enum that can encode the concept of a value being present or absent.
  4.  The function Option::unwrap expects *self*, meaning it expects *ownership* of arg. However arg is an *immutable reference* to an option, so it cannot provide ownership of the option. 

- match
 - Each match is tried from top to bottom
 - opt is a plain enum — its type is Option<String> and not a reference like &Option<String>. Therefore a match on opt will move non-ignored fields like s. 
 - If we want to peek into opt without moving its contents, the idiomatic solution is to match on a reference:

- `if let`
  - if let as syntax sugar for a match that runs code when the value matches one pattern and then ignores all other values.
  - The block of code that goes with the else is the same as the block of code that would go with the _ case in the match expression that is equivalent to the if let and else


## Chapter7 Managing Growing Projects with Packages, Crates, and Modules
### Packages: A Cargo feature that lets you build, test, and share crates
  - a bundle of one or more crates that provides a set of functionality.
  - A package can contain as many binary crates as you like, but at most only one library crate.
  - Using External Packages
    1. the standard std library is also a crate that’s external to our package.we *don’t* need to change Cargo.toml to include std. But *we do need to refer to it* with use to bring items from there into our package’s scope
### Crates: A tree of modules that produces a library or executable
  - Binary create: must have a function called `main`
  - Library crates : define functionality intended to be shared with multiple projects.
    Rustaceans say “crate”, they mean library crate, and they use “crate” interchangeably with the general programming concept of a *“library"*.

### Modules and use: Let you control the organization, scope, and privacy of paths
  - 用处
    1. let us organize code within a crate for readability and easy reuse
    2. allow us to control the privacy of items, because code within a module is private by default
  - parent and child
    1. all items (functions, methods, structs, enums, modules, and constants) *are private to parent modules* by default. 
    2. Items in a parent module can’t use the private items inside child modules, but items in child modules can use the items in their ancestor modules. 
### Paths: A way of naming an item, such as a struct, function, or module
- the idiomatic way
  1. Bringing the function’s parent module into scope with use
  2. when bringing in structs, enums, and other items with use, it’s idiomatic to specify the full path
- `use std::io::Result as IoResult;`
- we can use nested paths to bring the same items into scope in one line.`use std::{cmp::Ordering, io};`,`use std::io::{self, Write};`

## Chapter8 
### Vector
- Reason for a reference to the first element care about changes at the end of the vector 
  1. adding a new element onto the end of the vector might require allocating new memory and copying the old elements *to the new space*
  2. the reference to the first element would be pointing to *deallocated memory*
- Vec::push moves its argument, so s is not usable after calling v.push(s)
- When the vector gets dropped, all of its contents are also dropped, meaning the integers it holds will be cleaned up.

### String
- the compiler can coerce the &String argument into a &str  
- Rust strings don’t support indexing to *avoid returning an unexpected value and causing bugs that might not be discovered immediately*
- three relevant ways to look at strings from Rust’s perspective
  1. bytes
  2. scalar values
  3. grapheme clusters
- The best way to operate on pieces of strings is to *be explicit about whether you want* characters or bytes
-  &str is a promise that the byte sequence it points to will always be valid UTF-8

### hash map
- Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type
- For types that implement the Copy trait, like i32, the values are copied into the hash map. - For *owned values* like String, the values will be moved and the hash map will be *the owner of those values*

## chapter10
### Generic Data Types
- Rust instead requires you to state the expected capabilities of generic types up front
- Without restrictions, a generic type T has no capabilities: it cannot be printed, cloned, or mutated (although it can be dropped).
- Rust does not have inheritance-like mechanisms for specializing methods as you might find in an object-oriented language,
-  Monomorphization is the process of turning generic code into specific code by filling in the concrete types that are used when compiled

### trait
- A trait defines functionality a particular type has and can share with other types.
- One restriction to note is that we can implement a trait on a type only if at least one of the trait or the type is local to our crate.
- Default implementations can call other methods in the same trait, even if those other methods don’t have a default implementation
- traits in parameter
  ```Rust
  fn some_function<T:Display + Clone ,U: Clone + Debug>(t:&T,u:&U) -> i32{}
  // Clearer Trait Bounds with where Clauses
  fn some_function<T,U>()(t:&T,u:&U) -> i32
  where 
    T:Display + Clone ,
    U: Clone + Debug
  {}
  ```
- can only use impl Trait if you’re returning a single type
- Using Trait Bounds to Conditionally Implement Methods
  ```Rust
  use std::fmt::Display;

  struct Pair<T> {
      x: T,
      y: T,
  }

  impl<T> Pair<T> {
      fn new(x: T, y: T) -> Self {
          Self { x, y }
      }
  }

  impl<T: Display + PartialOrd> Pair<T> {
      fn cmp_display(&self) {
          if self.x >= self.y {
              println!("The largest member is x = {}", self.x);
          } else {
              println!("The largest member is y = {}", self.y);
          }
      }
  }
  ```
- conditionally implement a trait for any type that implements another trait
  ```Rust
  impl<T: Display> ToString for T {
    // --snip--
  }
  ```
### lifetime
- Lifetime annotations don’t change how long any of the references live. Rather, they describe the relationships of the lifetimes of multiple references to each other without affecting the lifetimes
- the names of lifetime parameters must start with an apostrophe (') and are usually all lowercase and very short
-  when we specify the lifetime parameters in this function signature, we’re not changing the lifetimes of any values passed in or returned. Rather, we’re specifying that the borrow checker should reject any values that don’t adhere to these constraints.