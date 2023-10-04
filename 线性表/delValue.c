#include <stdio.h>
struct List
{
  /* data */
  int *data;
  int length;
};

int delValue(struct List *list, int value)
{
  if (list->length == 0)
    return -1;
  int i = 0, j = 0;
  while (i < list->length)
  {

    if (list->data[i] == value)
    {
      j++;
    }
    else
    {
      i++;
    }
    list->data[i] = list->data[i + j];
  }
  list->length -= j;
  return 0;
}

int delValue2(struct List *list, int value)
{
  if (list->length == 0)
    return -1;
  int count = 0;
  for (int i = 0; i < list->length; i++)
  {
    if (list->data[i] != value)
    {
      list->data[count] = list->data[i];
      count++;
    }
  }
  list->length = count;
  return 0;
}

int main()
{
  struct List list;
  int data[] = {1, 4, 5, 2, 3, 2, 2, 4, 6};
  list.data = data;
  list.length = 9;
  delValue2(&list, 2);

  for (int i = 0; i < list.length; i++)
  {
    printf("%d ", list.data[i]);
  }
  return 0;
}