<div class="row">
   <div class="col-lg-12">
   <div class="panel panel-default">
   <div class="panel-heading">
   <h2><?= $title; ?></h2>

   <?php foreach($producten as $product) : ?>
   <?php if(empty($product['onderdeel'])){
   echo '<h4>'. $toevoegen .'</h4>';
   }
    else {
     echo '<h4>'. $description .'</h4>';
   }
   ?>
   <?php break; endforeach; ?>
   </div>
   <!-- /.panel-heading -->
   <div class="panel-body">
   <div class="table-responsive">
   <table class="table table-striped table-bordered table-hover">
  <td>
<table class="table table-striped table-bordered table-hover">
<thead>
<?php foreach($producten as $product) : ?>
  <?php if(!empty($product['onderdeel'])){ ?>
<tr>
   <td><small> 
        <label class="product-naam">Product, productnaam en prijs</label>       
    </small></td> 

      <td><small> 
        <label class="product-naam">Onderdeel, beschrijving en aantal</label>    

   </small></td> 

      <td><small> 
        <label class="product-naam">Leverancier(s)</label>    
   </small></td> 

       <td><small>      
   </small></td> 
     </tr> 
    </thead>
    <tbody>

    <td><small>
<?php echo $product['title']; ?> 
 </small></td>
<td><small> 
      <?php if(empty($product['voorraad_id'])){
           echo $product['onderdeel'];       
      }
      ?>
</small></td>
  <td><small><?php echo $product['leverancier']; ?>
</small></td>
<td><small>
<?php foreach($producten as $product) : ?>       
   <?php echo form_open('/producten/verwijder/' . $product['id']); ?>
                <input type="submit" value="Verwijder" class="btn btn-danger"> <?php break; endforeach; ?> 
</small></td>
<?php } ?>
<?php endforeach; ?>
</tbody>
</table>
</td>
    </table>

    <?php foreach($producten as $product) : ?>
    <small class="datum-toegevoegd">Toegevoegd op:
    <?php echo $product['created_at']; ?>
    </small>
    <br>                               
    <p>  
    <?php break; endforeach; ?>
<p>

<?php foreach($producten as $product) : ?>
 <a class="btn btn-default pull-left" href="<?php echo base_url(); ?>producten/toevoegen/    <?php echo $product['slug']; ?>">Product toevoegen</a>
        
   <?php echo form_open('/producten/verwijder/' . $product['id']); ?>
                <input type="submit" value="Verwijder" class="btn btn-danger"> 
                <?php break; endforeach; ?>

</div>
<!-- /.table-responsive -->
</div>
<!-- /.panel-body -->
</div>
<!-- /.panel -->
</div>
<!-- /.col-lg-6 -->  
</div>



    
