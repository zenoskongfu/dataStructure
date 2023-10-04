// 求二叉树的高度
#include "util.h"

int getTreeHeight(struct Node *tree)
{
  if (tree == NULL)
    return 0;
  int leftHeight = getTreeHeight(tree->left);
  int rightHeight = getTreeHeight(tree->right);
  if (leftHeight <= rightHeight)
    return rightHeight + 1;
  return leftHeight + 1;
}

int getTreeHeight2(struct Node *tree)
{
  if (tree == NULL)
    return 0;
  struct Node *queue[16], *topNode = NULL;
  int pre = 0, tail = 0, r = 0, level = 0;
  queue[tail++] = tree;
  while (pre != tail)
  {

    topNode = queue[pre++];

    if (topNode->left != NULL)
      queue[tail++] = topNode->left;
    if (topNode->right != NULL)
      queue[tail++] = topNode->right;
    if (r == pre - 1)
    {
      r = tail - 1;
      level++;
    }
  }
  return level;
}

int main(int argc, char const *argv[])
{
  /* code */
  int data[17] = {-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};
  struct Node *tree = creatTreeByArray(data, 1, 16);
  int height = getTreeHeight2(tree);
  printf("the height of tree is %d; \n", height);
  return 0;
}
