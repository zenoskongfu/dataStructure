#include <stdio.h>
#include <stdlib.h>
#include "util.h"

struct List *mergeList(struct List *list1, struct List *list2, struct List *list3)
{
  int data[list1->length + list2->length];
  int i = 0, j = 0, k = 0;
  while (i < list1->length && j < list2->length)
  {
    if (list1->data[i] < list2->data[j])
    {
      list3->data[k++] = list1->data[i++];
    }
    else
    {
      list3->data[k++] = list2->data[j++];
    }
  }

  if (i < list1->length)
  {
    list3->data[k++] = list1->data[i++];
  }

  if (j < list2->length)
  {
    list3->data[k++] = list2->data[j++];
  }

  return list3;
}

int main(int argc, char const *argv[])
{
  struct List *list1 = (struct List *)malloc(sizeof(struct List)), *list2 = (struct List *)malloc(sizeof(struct List)),
              *list3 = (struct List *)malloc(sizeof(struct List));
  list1->length = 5;
  list2->length = 5;
  int data1[5] = {1, 3, 5, 7, 9};
  int data2[5] = {2, 4, 6, 8, 10};
  list1->data = data1;
  list2->data = data2;
  mergeList(list1, list2, list3);
  printList(list3);
  return 0;
}
