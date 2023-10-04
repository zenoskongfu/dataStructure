#include <stdio.h>
#include "util.h"

int delSameValue(struct List *list)
{
  if (list->length == 0 || list->data == NULL)
    return -1;
  int i = 0, j = 1;
  for (; j < list->length; j++)
  {
    if (list->data[i] != list->data[j])
    {
      i++;
      list->data[i] = list->data[j];
    }
  }
  list->length = i + 1;
  return 0;
}

int main(int argc, char **argv)
{
  struct List list;
  list.length = 10;
  int data[10] = {1, 2, 3, 4, 5, 5, 5, 8, 9, 10};
  list.data = data;
  delSameValue(&list);
  printList(&list);

  return 0;
}