<h2><?= $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('producten/update'); ?>

   <input type="hidden" name="id" value="<?php echo $product['id']; ?>"> 
 
<div class="form-group">
    <label>Product</label>
     <input type="text" class="form-control" name="title" placeholder="product"
     value="<?php echo $product['title']; ?>">
  </div>
  <div class="form-group">
    <label>Productnaam</label>
     <input type="text" class="form-control" name="name" placeholder="productnaam" 
     value="<?php echo $product['name']; ?>">
  </div>
  <div class="form-group">
    <label>Prijs</label>
     <input type="text" class="form-control" name="prijs" placeholder="prijs"
     value="<?php echo $product['prijs']; ?>">
  </div>

  <button type="submit" class="btn btn-default">Submit</button>
</form>