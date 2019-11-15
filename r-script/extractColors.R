library(here)
library(tidyverse)
library(paletter)
library(DescTools)
library(colorspace)

#you can find images used for the analysis here: https://www.whitehousehistory.org/galleries/presidential-portraits

#I saved them in a folder called img
#And used the following structure to name the files: name_lastname.jpg (barack_obama.jpg)
path <- "img/"

drawing.presidents <- function() {
  
  df <- data.frame()
  
  vector <- c()
  
  files <- list.files(path="img", pattern = "*.jpg")
  
  for(i in files) {
    
    #It separates the name_lastname part from the extension .jpg, so the name_lastanme can be used later as an id
    name <- as.character(strsplit(i, ".jpg"))
    
    print(paste("This president is", name, sep = " "))
    
    image.path = paste(path, i, sep = "")
    
    temp <- create_palette(image_path = paste(path, i, sep = ""),
                           number_of_color = 16,
                           type_of_variable = "categorical")
    
    vector <- c(temp)
    
    vector <- as.data.frame(vector) %>%
      mutate(
        name = name
      )
    
    df <- bind_rows(df, vector)
    
    df <- data.frame(lapply(df, as.character), stringsAsFactors=FALSE)
    
  }
  return(df)
}
