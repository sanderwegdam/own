<?php foreach($producten as $product) : ?> 

			            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                             
                            <h2><?php echo $product['title']; ?></h2>
                           
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                   <th><label class="product">Product</label></th>
                                   <th><label class="product-naam">Productnaam</label></th>                                            
								<th><label class="product-naam">Prijs</label></th>
								<th><label class="product-naam">Onderdeel, beschrijving en aantal</label></th>
								<th><label class="product-naam">Leverancier(s)</label></th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><small>
                                            <?php echo $product['title']; ?></small></td>
                                            <td><small>
                                            <?php echo $product['name']; ?></small></td>
 											<td><small>
                                            <?php echo $product['prijs']; ?></small></td>                           
                                            <td><small>
                                            <?php echo $product['onderdeel']; ?></small></td>                    
                                            <td><small>
                                            <?php echo $product['leverancier']; ?></small></td>
                                        </tr>                                   
                                    </tbody>
                                </table>

                                <small class="datum-toegevoegd">Toegevoegd op: <?php echo $product['created_at']; ?>	
								</small><br>
                                <p><a class="btn btn-default" href="<?php echo site_url('/producten/' . $product['slug']); ?>">Stel samen</a></p>

                            </div>
                            <!-- /.table-responsive -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->                
            </div>
		
		
		

	<?php endforeach; ?>