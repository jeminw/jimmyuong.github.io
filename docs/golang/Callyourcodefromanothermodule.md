1.  [Documentation](/doc/)
2.  [Tutorials](/doc/tutorial/)
3.  [Call your code from another module](/doc/tutorial/call-module-code)

# Call your code from another module

In the [previous section](/doc/tutorial/create-module.html), you created a `greetings` module. In this section, you'll write code to make calls to the `Hello` function in the module you just wrote. You'll write code you can execute as an application, and which calls code in the `greetings` module.

**Note:** This topic is part of a multi-part tutorial that begins with [Create a Go module](/doc/tutorial/create-module.html).

1.  Create a `hello` directory for your Go module source code. This is where you'll write your caller.
    
    After you create this directory, you should have both a hello and a greetings directory at the same level in the hierarchy, like so:

   ```bash 
    home /
     |-- greetings/
     |-- hello/
   ``` 

For example, if your command prompt is in the greetings directory, you could use the following commands:


```bash
cd ..
mkdir hello
cd hello
```
    
2.  Enable dependency tracking for the code you're about to write.

To enable dependency tracking for your code, run the [`go mod init` command](/ref/mod#go-mod-init), giving it the name of the module your code will be in.

For the purposes of this tutorial, use `example.com/hello` for the module path.

```bash 
$ go mod init example.com/hello
go: creating new go.mod: module example.com/hello
```
 
3.  In your text editor, in the hello directory, create a file in which to write your code and call it hello.go.
4.  Write code to call the `Hello` function, then print the function's return value.
 
To do that, paste the following code into hello.go.

```go 
package main

import (
    "fmt"

    "example.com/greetings"
)

func main() {
    // Get a greeting message and print it.
    message := greetings.Hello("Gladys")
    fmt.Println(message)
}
```

In this code, you:

*   Declare a `main` package. In Go, code executed as an application must be in a `main` package.
*   Import two packages: `example.com/greetings` and the [`fmt` package](https://pkg.go.dev/fmt/). This gives your code access to functions in those packages. Importing `example.com/greetings` (the package contained in the module you created earlier) gives you access to the `Hello` function. You also import `fmt`, with functions for handling input and output text (such as printing text to the console).
*   Get a greeting by calling the `greetings` package’s `Hello` function.

5.  Edit the `example.com/hello` module to use your local `example.com/greetings` module.

>编辑example.com/hello模块以使用您的本地 example.com/greetings模块

For production use, you’d publish the `example.com/greetings` module from its repository (with a module path that reflected its published location), where Go tools could find it to download it. For now, because you haven't published the module yet, you need to adapt the `example.com/hello` module so it can find the `example.com/greetings` code on your local file system.

> 对于生产用途，您将从其存储库发布example.com/greetings 模块（具有反映其发布位置的模块路径），Go 工具可以在其中找到它并下载它。现在，因为您还没有发布该模块，所以您需要调整该example.com/hello模块，以便它可以在您的本地文件系统上找到 example.com/greetings代码。

为此，请使用 go mod edit命令编辑example.com/hello 模块以将 Go 工具从其模块路径（模块不在的位置）重定向到本地目录（它所在的位置）

To do that, use the [`go mod edit` command](/ref/mod#go-mod-edit) to edit the `example.com/hello` module to redirect Go tools from its module path (where the module isn't) to the local directory (where it is).

1.  From the command prompt in the hello directory, run the following command:

>从 hello 目录中的命令提示符运行以下命令：

```bash
$ go mod edit -replace example.com/greetings=../greetings
```

The command specifies that `example.com/greetings` should be replaced with `../greetings` for the purpose of locating the dependency. After you run the command, the go.mod file in the hello directory should include a [`replace` directive](/doc/modules/gomod-ref#replace):

> 该命令指定example.com/greetings应将其替换../greetings为以查找依赖项。运行该命令后，hello 目录中的 go.mod 文件应包含一个指令： replace


```go
module example.com/hello

go 1.16

replace example.com/greetings => ../greetings
```
    
2.  From the command prompt in the hello directory, run the [`go mod tidy` command](/ref/mod#go-mod-tidy) to synchronize the `example.com/hello` module's dependencies, adding those required by the code, but not yet tracked in the module.
    
> 从 hello 目录中的命令提示符运行命令 以同步 模块的依赖项，添加代码所需但尚未在模块中跟踪的依赖项。 go mod tidyexample.com/hello

```go
$ go mod tidy
go: found example.com/greetings in example.com/greetings v0.0.0-00010101000000-000000000000
``` 

 After the command completes, the `example.com/hello` module's go.mod file should look like this:
    
    module example.com/hello
    
    go 1.16
    
    replace example.com/greetings => ../greetings
    
    require example.com/greetings v0.0.0-00010101000000-000000000000
    
    The command found the local code in the greetings directory, then added a [`require` directive](/doc/modules/gomod-ref#require) to specify that `example.com/hello` requires `example.com/greetings`. You created this dependency when you imported the `greetings` package in hello.go.
    
    The number following the module path is a _pseudo-version number_ -- a generated number used in place of a semantic version number (which the module doesn't have yet).
    
    To reference a _published_ module, a go.mod file would typically omit the `replace` directive and use a `require` directive with a tagged version number at the end.
    
    require example.com/greetings v1.1.0
    
    For more on version numbers, see [Module version numbering](/doc/modules/version-numbers).
    
6.  At the command prompt in the `hello` directory, run your code to confirm that it works.
    
    $ go run .
    Hi, Gladys. Welcome!
    

Congrats! You've written two functioning modules.

In the next topic, you'll add some error handling.

[< Create a Go module](/doc/tutorial/create-module.html) [Return and handle an error >](/doc/tutorial/handle-errors.html)