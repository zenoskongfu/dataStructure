#include <stdio.h>
#include "util.h"

int delSpaceValue(struct List *L, int leftValue, int rightValue)
{
  if (L->length == 0)
    return -1;
  int k = 0;
  for (int i = 0; i < L->length; i++)
  {
    if (L->data[i] < leftValue || L->data[i] > rightValue)
    {
      L->data[k] = L->data[i];
      k++;
    }
  }
  L->length = k;
  return 0;
}

int delSpaceValue2(struct List *L, int leftValue, int rightValue)
{
  if (L->length == 0)
    return -1;
  int k = 0;
  for (int i = 0; i + k < L->length; i++)
  {
    if (L->data[i + k] >= leftValue && L->data[i + k] <= rightValue)
    {
      while (L->data[i + k] <= rightValue && i + k < L->length)
      {
        k++;
      }
      i--;
    }
    else
    {
      L->data[i] = L->data[i + k];
    }
  }
  L->length = L->length - k;
  return 0;
}

int main(int argc, char const *argv[])
{
  struct List list;
  int data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  list.data = data;
  list.length = 10;
  delSpaceValue2(&list, 3, 7);
  printList(&list);
  return 0;
}
