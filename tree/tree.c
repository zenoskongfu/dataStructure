#include "util.h"

struct Node *creatTreeByArray(int *data, int index, int length)
{
  struct Node *root = (struct Node *)malloc(sizeof(struct Node));
  if (index > length)
    return NULL;
  root->data = data[index];
  root->left = creatTreeByArray(data, 2 * index, length);
  root->right = creatTreeByArray(data, 2 * index + 1, length);
  return root;
}

void printTreeLevel(struct Node *tree)
{
  struct Node *stack[19] = {0};
  int pre = 0, tail = 0;
  stack[tail++] = tree;
  while (pre != tail)
  {
    struct Node *topNode = stack[pre++];
    printf("%d ", topNode->data);
    if (topNode->left != NULL)
      stack[tail++] = topNode->left;
    if (topNode->right != NULL)
      stack[tail++] = topNode->right;
  }
};