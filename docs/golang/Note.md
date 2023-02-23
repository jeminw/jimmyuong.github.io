#

## 创建模块化

### 1.根目录下新建一个项目

```bash
mkdir /docs/hello/
cd /docs/hello/
#初始化hello文件 会生成go.mod 相当于package.json
go mod init hello
#创建运行文件，一个项目只有一个main
vim hello.go
```

在hello.go里输入以下内容:
```go
package main 

import ( 
    "fmt" 
    "log" 

    "example.com/greetings" 
) 

func main() { 
    // 设置预定义记录器的属性，包括
    // 日志条目前缀和禁用打印的标志
    // 时间，源文件和行号。
    log.SetPrefix("greetings: ") 
    log.SetFlags(0) 

    // 请求问候消息。
    消息，错误 := greetings.Hello("Gladys")
    // 如果返回错误，将其打印到控制台并
    // 退出程序。
    if err != nil { 
        log.Fatal(err) 
    } 

    // 如果没有返回错误，将返回的消息
    // 打印到控制台。
    fmt.Println(消息) 
}
```


### 2.根目录下创建一个模块
packpage 必须是模块的名称 greetings，类似于函数名称，模块名称

```bash
mkdir /docs/greetings/
cd /docs/greetings/
#初始化greetings项目 会生成go.mod 相当于package.json
go mod init greetings
#创建运行文件，一个项目只有一个main
vim greetings.go
```

在greetings.go里输入以下内容:
```go
package greetings

import (
    "errors"
    "fmt"
    "math/rand"
    "time"
)

// Hello returns a greeting for the named person.
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return name, errors.New("empty name")
    }
    // Create a message using a random format.
    //声明一个变量，来调用随机函数
    message := fmt.Sprintf(randomFormat(), name)
    return message, nil
}

// init sets initial values for variables used in the function.
func init() {
    rand.Seed(time.Now().UnixNano())
}

// randomFormat returns one of a set of greeting messages. The returned
// message is selected at random.
// 定义随机函数
func randomFormat() string {
    // A slice of message formats.
    formats := []string{
        "Hi, %v. Welcome!",
        "Great to see you, %v!",
        "Hail, %v! Well met!",
    }

    // Return a randomly selected message format by specifying
    // a random index for the slice of formats.
    return formats[rand.Intn(len(formats))]
}
```

### 3.在主程序里生成模块链接

```bash
cd /docs/hello
go mod tidy
# go: found example.com/greetings in example.com/greetings v0.0.0-00010101000000-000000000000
```
这会在/docs/hello/go.mod里生成这条信息，这个就是连接greetings模块的信息，v后面是版本号

### 4.运行模块

```bash
cd /docs/hello
go run .
# Great to see you, Gladys!
go run .
# Hail, Gladys! Well met!
go run .
# Hi, Gladys. Welcome!
```

## 多模块工作区

> 本教程介绍了 Go 中多模块工作区的基础知识。使用多模块工作区，您可以告诉 Go 命令您正在同时在多个模块中编写代码，并轻松地在这些模块中构建和运行代码。在本教程中，您将在共享的多模块工作区中创建两个模块，对这些模块进行更改，并在构建中查看这些更改的结果。

### 1.创建项目 

创建根目录
```bash
mkdir workspace
cd workspace
```

创建主目录
```bash
cd /workspace
mkdir hello
cd hello
go mod init example.com/hello
# go: creating new go.mod: module example.com/hello
```

### 2.添加模块

```bash
go get golang.org/x/example
```

### 3.创建主文件
```bash
cd /workspace/hello
vim hello.go
```

在hello.go里添加内容 
```go
package main

import (
    "fmt"

    "golang.org/x/example/stringutil"
)

func main() {
    fmt.Println(stringutil.Reverse("Hello"))
}
```
运行程序
```bash
go run .
# olleH
```

### 4.创建工作区

> 创建一个go.work文件来指定模块的工作区。

初始化工作区,回到根目录workspace

```bash
cd /workspace
go work init ./hello
```

该go work init命令指示为目录中包含模块的工作区go创建一个文件 。go.work./hello
该go命令生成一个go.work如下所示的文件：

```go
go 1.18

use ./hello
```
> 相当于指寂hello文件为主目录，即运行目录，类似scr，go.work的语法与go.mod类似，声明指定哪个版本与，运作目录，所以在workspace目录下，即根目录下，所有的模块都会被激活，这点跟vuecli其实是差不多的。

在workspace目录中，运行：
```bash
go run example.com/hello
olleH
```

1.克隆存储库
```bash
cd /workspace
$ git clone https://go.googlesource.com/example
# Cloning into 'example'...
# remote: Total 165 (delta 27), reused 165 (delta 27)
# Receiving objects: 100% (165/165), 434.18 KiB | 1022.00 KiB/s, done.
# Resolving deltas: 100% (27/27), done.
```

2.将模块添加到工作区
```bash
$ go work use ./example
```
该go work use命令将一个新模块添加到 go.work 文件中。它现在看起来像这样：
```go
go 1.18

use (
    ./hello
    ./example
)
```
> 该模块现在包括模块example.com/hello和golang.org/x/example模块。这将允许我们使用我们将在stringutil模块副本中编写的新代码，而不是我们使用命令下载的模块缓存中的模块版本go get。

3.添加新功能
> 我们将添加一个新函数来将字符串大写到包中golang.org/x/example/stringutil。在包含以下内容的目录toupper.go中创建一个名为的新文件：workspace/example/stringutil
```go
package stringutil

import "unicode"

// ToUpper uppercases all the runes in its argument string.
func ToUpper(s string) string {
    r := []rune(s)
    for i := range r {
        r[i] = unicode.ToUpper(r[i])
    }
    return string(r)
}
```

4.修改hello程序使用该函数
修改内容为workspace/hello/hello.go包含以下内容：
```go
package main

import (
    "fmt"

    "golang.org/x/example/stringutil"
)

func main() {
    fmt.Println(stringutil.ToUpper("Hello"))
}
```

5.在工作区运行代码
```go
$ go run example.com/hello
HELLO
```

6.更多

除了我们在本教程前面看到的之外，该go命令还有几个用于处理工作区的子命令：go work init

+ go work use [-r] [dir]如果文件存在，则为文件添加一个use指令，如果参数目录不存在，则删除该目录。该 标志递归地检查子目录。go.workdiruse-rdir
+ go work edit编辑go.work文件类似于go mod edit
+ go work sync将工作区构建列表中的依赖项同步到每个工作区模块中。

有关工作区和文件的更多详细信息，请参阅Go 模块参考中的工作区go.work。

## 连接数据库

[官网教程](https://go.dev/doc/tutorial/database-access)

### 1.创建mysql数据库
创建表
```bash
mysql> create database recordings;
mysql> use recordings;
# Database changed
```

create-tables.sql
```txt
DROP TABLE IF EXISTS album;
CREATE TABLE album (
  id         INT AUTO_INCREMENT NOT NULL,
  title      VARCHAR(128) NOT NULL,
  artist     VARCHAR(255) NOT NULL,
  price      DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO album
  (title, artist, price)
VALUES
  ('Blue Train', 'John Coltrane', 56.99),
  ('Giant Steps', 'John Coltrane', 63.99),
  ('Jeru', 'Gerry Mulligan', 17.99),
  ('Sarah Vaughan', 'Sarah Vaughan', 34.98);
```

```bash
mysql> source /path/to/create-tables.sql
mysql> select * from album;
```

### 2.创建GO项目

```bash
mkdir /workspace /workspace/main
cd /workspace/main
go mod init main
# create go.mod
vim main.go
```
```go
package main

import "github.com/go-sql-driver/mysql"
```

+ 将您的代码添加到main包中，以便您可以独立执行它。
+ 导入 MySQL 驱动程序github.com/go-sql-driver/mysql。

### 3.获取数据库句柄并连接

```bash
vim main.go
```

```go
package main

import "github.com/go-sql-driver/mysql"

var db *sql.DB

func main() {
    // Capture connection properties.
    cfg := mysql.Config{
        User:   os.Getenv("DBUSER"),
        Passwd: os.Getenv("DBPASS"),
        Net:    "tcp",
        Addr:   "127.0.0.1:3306",
        DBName: "recordings",
    }
    // Get a database handle.
    var err error
    db, err = sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        log.Fatal(err)
    }

    pingErr := db.Ping()
    if pingErr != nil {
        log.Fatal(pingErr)
    }
    fmt.Println("Connected!")
}
```
+ 声明一个db类型的变量*sql.DB。这是您的数据库句柄。
+ 创建db一个全局变量可以简化这个例子。在生产中，您将避免使用全局变量，例如将变量传递给需要它的函数或将其包装在结构中。
+ 使用 MySQL 驱动程序的Config - 和类型的FormatDSN - 收集连接属性并将它们格式化为连接字符串的 DSN。
+ 该Config结构使代码比连接字符串更易于阅读。
+ 调用sql.Open 初始化db变量，传递 的返回值 FormatDSN。
+ 检查来自 的错误sql.Open。例如，如果您的数据库连接细节格式不正确，它可能会失败。
+ 为了简化代码，您调用log.Fatal以结束执行并将错误打印到控制台。在生产代码中，您会希望以更优雅的方式处理错误。
+ 调用DB.Ping以确认连接到数据库是否有效。在运行时， sql.Open可能不会立即连接，具体取决于驱动程序。您在此处使用Ping确认 database/sql包可以在需要时连接。
+ 检查来自 的错误Ping，以防连接失败。
+ 如果连接成功，则打印一条消息Ping。

### 4.在main.go引入所需要的包

```go
package main

import (
    "database/sql"
    "fmt"
    "log"
    "os"

    "github.com/go-sql-driver/mysql"
)
```

1.开始将 MySQL 驱动程序模块作为依赖项进行跟踪。
使用 将go get github.com/go-sql-driver/mysql 模块添加为您自己的模块的依赖项。使用点参数表示“获取当前目录中代码的依赖项”。

```bash
$ go get .
# go get: added github.com/go-sql-driver/mysql v1.6.0
```

2.在命令提示符下，设置Go 程序使用的DBUSER和环境变量。DBPASS

在 Linux 或 Mac 上：

```bash
$ export DBUSER=username
$ export DBPASS=password
```

在 Windows 上：

```bash
C:\Users\you\data-access> set DBUSER=username
C:\Users\you\data-access> set DBPASS=password
```

3.在包含 main.go 的目录中的命令行中，通过键入一个点参数来运行代码，go run意思是“在当前目录中运行包”。

```bash
$ go run .
Connected!
```

### 查询多行

1. 定义结构
main.go
```go
type Album struct {
    ID     int64
    Title  string
    Artist string
    Price  float32
}
```

2.查询函数
main.go,albumsByArtist函数来查询数据库
```go
// albumsByArtist queries for albums that have the specified artist name.
func albumsByArtist(name string) ([]Album, error) {
    // An albums slice to hold data from returned rows.
    var albums []Album

    rows, err := db.Query("SELECT * FROM album WHERE artist = ?", name)
    if err != nil {
        return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var alb Album
        if err := rows.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
            return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
        }
        albums = append(albums, alb)
    }
    if err := rows.Err(); err != nil {
        return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
    }
    return albums, nil
}
```


3.更新您的main函数以调用albumsByArtist.

在 的末尾func main，添加以下代码。
```bash
albums, err := albumsByArtist("John Coltrane")
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Albums found: %v\n", albums)
```

### 查询单行

#### 1.在下面albumsByArtist，粘贴以下albumByID函数。

```go
// albumByID queries for the album with the specified ID.
func albumByID(id int64) (Album, error) {
    // An album to hold data from the returned row.
    var alb Album

    row := db.QueryRow("SELECT * FROM album WHERE id = ?", id)
    if err := row.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
        if err == sql.ErrNoRows {
            return alb, fmt.Errorf("albumsById %d: no such album", id)
        }
        return alb, fmt.Errorf("albumsById %d: %v", id, err)
    }
    return alb, nil
}
```

> 用于DB.QueryRow 执行SELECT查询指定ID的相册的语句。
> 它返回一个sql.Row. 为了简化调用代码（您的代码！），QueryRow不返回错误。相反，它安排从以后返回任何查询错误（例如sql.ErrNoRows）Rows.Scan。
> 用于Row.Scan将列值复制到结构字段中。
> 检查来自 的错误Scan。
> 特殊错误sql.ErrNoRows表示查询未返回任何行。通常，该错误值得用更具体的文本替换，例如此处的“没有这样的专辑”。

#### 2.更新main调用albumByID。

在 的末尾func main，添加以下代码。
```go
// Hard-code ID 2 here to test the query.
alb, err := albumByID(2)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Album found: %v\n", alb)
```
> 调用albumByID您添加的功能。
> 打印返回的相册 ID。

```bash
$ go run .
Connected!
Albums found: [{1 Blue Train John Coltrane 56.99} {2 Giant Steps John Coltrane 63.99}]
Album found: {2 Giant Steps John Coltrane 63.99}
```

