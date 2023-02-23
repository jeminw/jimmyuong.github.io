---
title: 'Tutorial: Get started with Go'
---

# Tutorial: Get started with Go

Table of Contents

[Prerequisites]()

[Install Go]()

[Write some code]()

[Call code in an external package]()

[Write more code]()

In this tutorial, you'll get a brief introduction to Go programming. Along the way, you will:

在这个教程中，你将学会简短的go编程，在这个过程中，你将：

Install Go (if you haven't already).

安装go(假如你已经安装好了)

+ Write some simple "Hello, world" code.
+ Use the go command to run your code.
+ Use the Go package discovery tool to find packages you can use in your own code.
+ Call functions of an external module.

Note: For other tutorials, see Tutorials.

备注：请查看另外的教程

Prerequisites Some programming experience. The code here is pretty simple, but it helps to know something about functions.

> 如果有一些其它语言的编程经验，那么这些代码将会是很简单的，而它能帮助你去理解一些关于函数的内容.

A tool to edit your code. Any text editor you have will work fine. Most text editors have good support for Go. The most popular are VSCode (free), GoLand (paid), and Vim (free).

> 使用工具去编辑你的代码，任何编辑器都可以。多功能文本编辑器能能更好的支持go语言，就像是VSCode(免费)，GoLand(付费),和vim(免费)

A command terminal. Go works well using any terminal on Linux and Mac, and on PowerShell or cmd in Windows.

> 一个命令终端，GO的运作在linux和Mac的终端有更好的表现，或是windows的命令行PowerShell.

## Install Go

> 安装 Go

Just use the Download and install steps.

## Write some code

Get started with Hello, World.

1. Open a command prompt and cd to your home directory.

> 打开命令行工具并cd到你的主文档

On Linux or Mac:
```bash
cd
```

On Windows:
```bash
cd %HOMEPATH%
```

2. Create a hello directory for your first Go source code.

> 创建一个你好的文档来承载你的第一个go源代码

For example, use the following commands:

> 举个例子，使用以下命令

```bash
mkdir hello
cd hello
```

3. Enable dependency tracking for your code.

> 有助于你了解代码并进行跟踪，为您的代码启用依赖项跟踪。

When your code imports packages contained in other modules, you manage those dependencies through your code's own module. That module is defined by a go.mod file that tracks the modules that provide those packages. That go.mod file stays with your code, including in your source code repository.

> 当你的代码引入另一个模块的包依赖，你通过你构建的模块来对这些包依赖进行管理，这些模块主要依赖于go.mod这个文件，基本上那些包都是由这个文件提供，该 go.mod 文件与您的代码一起保留，包括在您的源代码存储库中。

To enable dependency tracking for your code by creating a go.mod file, run the go mod init command, giving it the name of the module your code will be in. The name is the module's module path.

In actual development, the module path will typically be the repository location where your source code will be kept. For example, the module path might be github.com/mymodule. If you plan to publish your module for others to use, the module path must be a location from which Go tools can download your module. For more about naming a module with a module path, see Managing dependencies.

For the purposes of this tutorial, just use example/hello.

```bash
$ go mod init example/hello
go: creating new go.mod: module example/hello
```

4. In your text editor, create a file hello.go in which to write your code.

5. Paste the following code into your hello.go file and save the file.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

This is your Go code. In this code, you:

+ Declare a main package (a package is a way to group functions, and it's made up of all the files in the same directory).
+ Import the popular fmt package, which contains functions for formatting text, including printing to the console. This package is one of the standard library packages you got when you installed Go.
+ Implement a main function to print a message to the console. A main function executes by default when you run the main package.
+ Run your code to see the greeting.

```go
$ go run .
Hello, World!
```

The go run command is one of many go commands you'll use to get things done with Go. Use the following command to get a list of the others:

```go
$ go help
```

## Call code in an external package
When you need your code to do something that might have been implemented by someone else, you can look for a package that has functions you can use in your code.

1. Make your printed message a little more interesting with a function from an external module.
1. Visit pkg.go.dev and search for a "quote" package.
2. Locate and click the rsc.io/quote package in search results (if you see rsc.io/quote/v3, ignore it for now).
3. In the Documentation section, under Index, note the list of functions you can call from your code. You'll use the Go function.
4. At the top of this page, note that package quote is included in the rsc.io/quote module.
You can use the pkg.go.dev site to find published modules whose packages have functions you can use in your own code. Packages are published in modules -- like rsc.io/quote -- where others can use them. Modules are improved with new versions over time, and you can upgrade your code to use the improved versions.

2. In your Go code, import the rsc.io/quote package and add a call to its Go function.
After adding the highlighted lines, your code should include the following:
```go
package main

import "fmt"

import "rsc.io/quote"

func main() {
    fmt.Println(quote.Go())
}
```
3. Add new module requirements and sums.
Go will add the quote module as a requirement, as well as a go.sum file for use in authenticating the module. For more, see Authenticating modules in the Go Modules Reference.
```go
$ go mod tidy
go: finding module for package rsc.io/quote
go: found rsc.io/quote in rsc.io/quote v1.5.2
```
Run your code to see the message generated by the function you're calling.
```go
$ go run .
Don't communicate by sharing memory, share memory by communicating.
```
Notice that your code calls the Go function, printing a clever message about communication.

When you ran go mod tidy, it located and downloaded the rsc.io/quote module that contains the package you imported. By default, it downloaded the latest version -- v1.5.2.

## Write more code
With this quick introduction, you got Go installed and learned some of the basics. To write some more code with another tutorial, take a look at Create a Go module.