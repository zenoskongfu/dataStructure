#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "stack.h"

#ifndef _TRAVERSE_H
#define _TRAVERSE_H
struct List
{
  int *data;
  int length;
};

struct Node
{
  int data;
  struct Node *left;
  struct Node *right;
};

int printList(struct List *L);
void printTreePre(struct Node *tree);
void printTreeIn(struct Node *tree);
void printTreePost(struct Node *tree);
void printTreeLevel(struct Node *tree);

#endif
