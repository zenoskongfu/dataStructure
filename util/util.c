#include <stdio.h>
#include "util.h"

int printList(struct List *L)
{
  for (int i = 0; i < L->length; i++)
  {
    printf("%d\n", L->data[i]);
  }

  return 0;
};

void printTreePre(struct Node *tree)
{
  if (tree == NULL)
    return;
  printf("%d ", tree->data);
  printTreePre(tree->left);
  printTreePre(tree->right);
}

void printTreeIn(struct Node *tree)
{
  if (tree == NULL)
    return;

  printTreeIn(tree->left);
  printf("%d ", tree->data);
  printTreeIn(tree->right);
}

void printTreePost(struct Node *tree)
{
  if (tree == NULL)
    return;

  printTreePost(tree->left);
  printTreePost(tree->right);
  printf("%d ", tree->data);
}