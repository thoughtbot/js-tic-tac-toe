# Async on the command line

In this exercise, we are diving deeply into the asynchronous nature of
JavaScript with a command line application. In Node the `stdin` and `stdout`
objects are event streams. By default, nothing they do is blocking or
syncronous. That means that we need to have control flow mechanisms that can
wait for our IO to finish.



