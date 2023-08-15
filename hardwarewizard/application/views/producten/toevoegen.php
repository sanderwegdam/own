<h2><?= $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('producten/toevoegen'); ?>


  <div class="form-group">
  <label>Product</label>
   <select name="title" class="form-control">
    <?php foreach($producten as $product): ?>
  <strong class="product-naam">
    <option value="<?php echo $product['title'] . ' ' . $product['name'] . ' ' . $product['prijs']; ?>">
   <?php echo $product['title'] . ' ' . $product['name'] . ' ' . $product['prijs']; ?> 
    </option> 
   <?php endforeach; ?>
  </select>
 </div>


 
  <div class="form-group">
  <label>Onderdeel</label>
   <select name="onderdeel" class="form-control">
    <?php foreach($voorraad as $vr): ?>
  <strong class="product-naam">
    <option value="<?php echo $vr['onderdeel'] . ' ' . $vr['beschrijving'] . ' ' .   $vr['aantal']; ?>">

   <?php echo $vr['onderdeel'] . ' ' . $vr['beschrijving'] . ' ' . $vr['aantal']; ?> 

    </option> 
   <?php endforeach; ?>
  </select>
 </div>

  <div class="form-group">
  <label>Leverancier(s)</label>
  <select name="leverancier" class="form-control">
    <?php foreach($voorraad as $vr): ?>
      <option value="<?php echo '<h5>' . $vr['leverancier'] . '</h5>'; ?>">
      <?php echo '<h5>' . $vr['leverancier'] . '</h5>'; ?></option>
    <?php endforeach; ?>
  </select>
  </div>
 
  <button type="submit" value="sumbit-toevoegen" name="Submit-toevoegen" class="btn btn-default">Submit</button>
</form>