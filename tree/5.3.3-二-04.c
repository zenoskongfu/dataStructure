#include "util.h"

// 试给出二叉树自下而上，自右而左层次遍历的算法
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

  printTreeLevel(tree);
  printf("\n");
  return 0;
}
