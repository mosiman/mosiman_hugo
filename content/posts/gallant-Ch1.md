---
title: "Neural Network Learning -- Chapter 1"
date: 2019-07-03T22:33:44-04:00
draft: true
---



I got this book on sale for 13 bucks. Not too shabby for a fairly substantial hardcover book! It's quite old though, this particular copy seems to be from 1995. 


Intermediate cell
: Cell that is not an input cell or an output cell. Supposedly are necessary for computing non-separable functions. Sounds very interesting!

Each cell computes an "activation", which is fancy speak for saying each cell spits out a number based on numbers that other cells have spat at it.

Feedforward network
: The graph of cells contains NO directed cycles. 

Recurrent network
: The graph of cells contains directed cycles. 

$k$-Layer network
: Cells are grouped into subsets (layers) $L_0, L_1, \cdots, L_k$ If a cell in layer $L_a$ is connected to a cell in layer $L_b$ it must be that $a < b$. It can be the case that cell connections skip layers. A _strictly_ $k$-layer network requires that $b = a+1$. 

Each cell computes an activation based on a linear combination of its inputs. Each input has a weight that may be modified through training.

There is also talk of a bias cell. The bias cell is often omitted, but it is there. Usually, the bias cell will always have activation 1, and be connected to every node. Each weight associated with the bias cell can shift the activation of nodes. I think of it as training the "position" of activation functions.

Activation functions are usually

- nonlinear
- bounded
- piecewise differentiable

Example: sigmoid function. 


## Multilayer perceptron (MLP)

An arbitrary feedforward network where the cells are constrained to the following:

- Numbering the cells starting from $1$, cells can only connect "forward". E.g., if we have a cell $u_j$ and a cell $u_i$, it has to be that $j < i$. 
- Cell activations are discrete. Usually, the activation $f(S_i)$ ($f$ is the activation function, $S_i$ is the linear combination inputs) are mapped to $\{1, 0, -1\}$ according to whether $f(S_i)$ is positive, 0, or negative.

## Backproprogation Networks (BPN)

Backprop is actually the name of the algorithm used to train weights. But I digress. Backprop networks as Gallant defines them are MLPs with continuous cell activations. 

# Select exercises

## Problem 1

Prove a network is a feedforward network if and only if its cells can be numbered in such a way that

1. All $p$ input cells are numbered $1$ through $p$
2. Whenever cell $u_j$ is connected to cell $u_i$, then $j < i$. 

<hr>

Assume the network is a feedforward network. Then the graph contains no cycles, by its definition. Let us fix the input cells $\{u_1, \cdots, u_p\}$. 

Suppose that if we have cell $u_j$ connected to cell $u_i$ such that $j \leq i$. If $j = i$ then we have a cycle in one node. If $j < i$ then there is a cell $k$ such that $k \in (j, i)$. It is then possible to construct a cycle between cells $u_i, u_j$, and $u_k$. Therefore, it must be that if the network is a feedforward network that it satisfies the two properties.

Based on the properties of input cells, the other direction (the $\impliedby$ direction) is fairly straightforward. No cells can feed into input cells, so there is no possibility for a loop on this layer. The other cells are ordered such that cycles are not possible since the cells "feed forward". 

## Problem 2

Prove that for a $k$ layer network

1. It is a feedforward network
2. All cells in layer $L_0$ are input cells
3. All nonsuperfluous cells in layer $L_k$ are output cells. 

<hr>

A $k$ layered network by definition has that a cell in any layer $L_i$ must connect to a cell in layer $L_j$ where $i < j$. Assuming nice ordering of cells, there is no opportunity to cycle. Therefore it is a feedforward network. 

Because of this property, it is necessary that the first layer is considered to be input cells. 

Superfluous cells are those that can be removed from the graph without affecting "input/output behaviours" of the network. For a $k$ layer network, $k$ is the last layer. If the cell was superfluous, it would by definition not affect the output behaviour. Therefore, output cells must be nonsuperfluous. 


## Problem 11

A linear cell is a cell that merely outputs its weighted sum $u_i = S_i = \sum_j w_{i,j}u_j$. Prove that a feedforward network consisting of linear cells can always be replaced by an equivalent (linear) single-layer network.

<hr>

A single layer network has the form

<img src="images/gallant-ch1/singlelayernetwork.png">

I.e., it has input cells and output cells, but no intermediate layers. 

Consider a general feed forward network with input cells $u_1, \cdots, u_p$ and output cells $u_{k-q}, u_{k-(q-1)}, \cdots, u_{k-(q-(q-1))}, u_{k}$. 

Assuming the same number of input and outputs for the single layer network, it can be achieved by considering the following:

Each cell is a function of its inputs. Substituting this function into the next cells activation function yields another linear combination of the first cell's and second cell's inputs. We can follow this recurrence back until the $p$ input cells to yield the proper weights. 

I should flesh this out better probably. 


# Programming project

We'll write a small program in Julia that reads the number of input, intermediate, and output cells as well as a matrix of weights, and actual inputs. 
