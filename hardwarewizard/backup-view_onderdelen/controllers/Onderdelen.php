<?php 
	class Producten extends CI_Controller{
		public function index() {
			
			$data['title'] = 'Onderdelen HardwareWizard';

			$data['onderdelen'] = $this->onderdeel_model->get_onderdelen();

			$this->load->view('templates/header');
			$this->load->view('onderdelen/index', $data);
			$this->load->view('templates/footer');
		
		}


		public function maak() {
			$data['title'] = 'Maak Onderdeel';

			$data['voorraad'] = $this->product_model->get_voorraad();
			
			$this->form_validation->set_rules('title', 'Product', 'required');
			$this->form_validation->set_rules('name', 'Productnaam', 'required');
			

			if($this->form_validation->run() === FALSE){
				$this->load->view('templates/header');
				$this->load->view('onderdelen/maak', $data);
				$this->load->view('templates/footer');
			} else {
				$this->onderdeel_model->maak_onderdeel();
				redirect('onderdelen');
			}
		}

		public function verwijder($id) {
			$this->onderdeel_model->delete_onderdeel($id);
			redirect('onderdelen');
		}


			public function wijzig($slug){

			$data['product'] = $this->product_model->get_producten($slug);

			$data['voorraad'] = $this->product_model->get_voorraad();

			$data['onderdeel'] = $this->product_model->get_onderdelen();

			if(empty($data['onderdeel'])){
				show_404();
			}

			$data['title'] = 'Selecteer onderdelen';

			$this->load->view('templates/header');
			$this->load->view('onderdelen/wijzig', $data);
			$this->load->view('templates/footer');


			}


			public function update() {
				$this->onderdeel_model->update_onderdeel();
				redirect('onderdelen');
			}


			public function posts($id){

			$data['title'] = $this->product_model->	
			selecteer_voorraad($id)->name; //only name

			$data['producten'] = $this->product_model->selecteer_producten_van_voorraad($id);

				$this->load->view('templates/header');
				$this->load->view('producten/index', $data);
				$this->load->view('templates/footer');

		}

			

	}
