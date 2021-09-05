---
title: "Fedora, Nix, and Gio -- Pain"
date: 2021-08-27T08:31:00-04:00
categories:
- Linux
- Nix
- Golang
tags:
- Programming
---

My current setup on my personal laptop (integrated graphics) is Fedora with the Nix package manager, running Wayland. I have recently wanted to try programming immediate-mode GUIs via [Gio](https://gioui.org/) and it was kind of a pain in the ass. Here's what worked for me.

First, I cloned the [gio-examples repository](https://git.sr.ht/~eliasnaur/gio-example) so that I had something to test against...

Then, I use the following `nix-shell` configuration:

```
let
  pkgs = import <nixpkgs> {};
  nixgl = import <nixgl> {};
in
pkgs.mkShell {
  shellHook = ''
    export GOPATH="$(pwd)/.go"
    export GOCACHE=""
    export GO111MODULE='on'
  '';
  buildInputs = [
    pkgs.go
    pkgs.libxkbcommon
    pkgs.pkgconfig
    pkgs.egl-wayland
    pkgs.libGL
    pkgs.wayland
    # pkgs.xorg.libX11
    # pkgs.xorg.libXcursor
    # pkgs.xorg.libXfixes
    nixgl.auto.nixGLDefault
  ];
}

# NOTE: you may need to add this repo for the nix openGL wrapper:
# nix-channel --add https://github.com/guibou/nixGL/archive/main.tar.gz nixgl && nix-channel --update
```

This nix-shell configuration is the cumulation of many hours of trial, error, and Google.

Lessons learned:
- if you use `pkg-config` to link libraries (is that the right term?), you have to include `pkg-config` in your nix shell because the system `pkg-config` (fedora, in my case) won't look in the right spots.
- For similar reasons, even if you have Wayland installed on your system, you'll need to wayland libs in your nix shell.
- openGL is a pain in the ass, especially when you know nothing about it and things are supposed to "just work" (TM)
- read documentation more carefully, as I missed the build flags for ignoring X11 builds for a long time.

Place my nix-shell configuration somewhere, probably `gio-examples/shell.nix`. If you name it `shell.nix` then invoke `nix-shell` to shell into the new environment.

To run the `hello` example, this should get you going:

```
nixGL go run -tags nox11 hello.go
```

I'm sure this sucks even more if you have a discrete GPU, so my condolences go out to you if you are in that position.
