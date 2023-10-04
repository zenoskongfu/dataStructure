#include <stdio.h>
#include "util.h"

void printList(int *data, int length)
{
  for (int i = 0; i < length; i++)
  {
    printf("%d ", data[i]);
  }
  printf("\n");
};