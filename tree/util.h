#include <stdio.h>
#include <stdlib.h>

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

struct Node *creatTreeByArray(int *data, int index, int length);

void printTreeLevel(struct Node *tree);

#endif
