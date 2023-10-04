#include <stdio.h>

void printList(int *data, int length)
{
  for (int i = 0; i < length; i++)
  {
    printf("%d ", data[i]);
  }
  printf("\n");
};

int main()
{
  int data[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
  printList(data, 10);
  return 0;
}