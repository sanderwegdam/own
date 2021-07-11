				<div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>Product</h3><h4><?php echo $product['title']; ?></h4>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">

                        <a class="btn btn-default pull-left" href="<?php echo base_url(); ?>producten/aanpassen/
<?php echo $product['slug']; ?>">Onderdeel aanpassen</a>        
<?php echo form_open('/producten/verwijder/' . $product['id']); ?>
<input type="submit" value="Verwijder" class="btn btn-danger">     </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->                
            </div>

