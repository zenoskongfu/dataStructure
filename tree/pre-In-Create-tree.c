#include "util.h"
// 1 23 4567
// pre 1245367
// In

struct Node *preInCreate(int *preData, int preStart, int preEnd, int *inData, int inStart, int inEnd)
{
  struct Node *node = (struct Node *)malloc(sizeof(struct Node));
  node->data = preData[preStart];
  int i;
  for (i = inStart; node->data != inData[i]; i++)
    ;
  int lLen = i - inStart;
  int rLen = inEnd - i;
  if (lLen > 0)
  {
    node->left = preInCreate(preData, preStart + 1, preStart + lLen, inData, inStart, i - 1);
  }
  else
  {
    node->left = NULL;
  }
  if (rLen > 0)
  {
    node->right = preInCreate(preData, preEnd - rLen + 1, preEnd, inData, inEnd - rLen + 1, inEnd);
  }
  else
  {
    node->right = NULL;
  }

  return node;
}

void printTreePre2(struct Node *tree)
{
  struct Node *stack[10] = {0};
  int top = -1;
  // stack[++top] = tree;
  struct Node *p = tree, *pre;
  while (top != -1 || p)
  {
    while (p)
    {
      printf("%d ", p->data);
      stack[++top] = p;
      p = p->left;
    }
    struct Node *topNode = stack[top--];
    p = topNode->right;
  }

  printf("\n");
}

void printTreeIn2(struct Node *tree)
{
  struct Node *stack[10] = {0};
  int top = -1;
  struct Node *p = tree;
  while (p || top != -1)
  {
    while (p)
    {
      stack[++top] = p;
      p = p->left;
    }
    struct Node *topNode = stack[top--];
    printf("%d ", topNode->data);
    p = topNode->right;
  }

  printf("\n");
}

void printTreePost2(struct Node *tree)
{
  struct Node *stack[10] = {0}, *p = tree, *r;
  int top = -1;
  while (p || top != -1)
  {
    while (p)
    {
      stack[++top] = p;
      p = p->left;
    }
    struct Node *topNode = stack[top];
    if (r == topNode->right)
    {
      top--;
      printf("%d ", topNode->data);
      r = topNode;
    }
    else
    {
      p = topNode->right;
      r = p;
    }
  }
  printf("\n");
}

void printLevelContrary(struct Node *tree)
{
  struct Node *queue[10] = {0}, *topNode;
  int pre = 0, tail = 0;
  queue[tail++] = tree;
  while (pre != tail)
  {
    topNode = queue[pre++];
    if (topNode->left != NULL)
      queue[tail++] = topNode->left;
    if (topNode->right != NULL)
      queue[tail++] = topNode->right;
  }

  for (int i = tail - 1; i >= 0; i--)
  {
    printf("%d ", queue[i]->data);
  }
  printf("\n");
}

int main(int argc, char const *argv[])
{

  int data[11] = {-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  struct Node *tree = creatTreeByArray(data, 1, 10);
  printTreePost(tree);
  printf("\n");
  printTreePost2(tree);
  printTreeLevel(tree);
  printf("\n");

  printLevelContrary(tree);
  return 0;
}
