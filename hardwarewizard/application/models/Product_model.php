<?php
	class Product_model extends CI_Model {
		public function __construct(){
			$this->load->database();
		}

		public function get_producten($slug = FALSE){
			if($slug === FALSE){
				$this->db->order_by('producten.id', 'DESC');
				//$this->db->join('voorraad', 'voorraad.id = producten.voorraad_id');
				$query = $this->db->get('producten');
				return $query->result_array();
			}
			$query = $this->db->get_where('producten', array('slug' => $slug));
			return $query->row_array();
		}

		public function maak_product() {
			
			$slug = url_title($this->input->post('title'));
				$data = array (
				'title' => $this->input->post('title'),
				'name' => $this->input->post('name'),
				'prijs' => $this->input->post('prijs'),	
				'slug' => $slug);

				return $this->db->insert('producten', $data);
		}

		public function toevoegen_product() {
			
			$slug = url_title($this->input->post('onderdeel'));

			$data = array (
				'title' => $this->input->post('title'),
				'onderdeel' => $this->input->post('onderdeel'),
				'slug' => $slug,
				'leverancier' => $this->input->post('leverancier'));		

			return $this->db->insert('producten', $data);
		}

		public function delete_product($id) {
			$this->db->where('id', $id);
			$this->db->delete('producten');
			return true;
		}

		public function update_product() {

				$slug = url_title($this->input->post('title'));

				$data = array (
				'onderdeel' => $this->input->post('onderdeel'),
				'title' => $this->input->post('title'),		
				'leverancier' => $this->input->post('leverancier'));			
				
				$this->db->where('id', $this->input->post('id'));
				return $this->db->update('producten', $data);
		}

		public function get_voorraad() {
			$this->db->order_by('name');
			$query = $this->db->get('voorraad');
			return $query->result_array();		
		}

		public function get_onderdeel() {
			$this->db->order_by('name');
			$query = $this->db->get('voorraad');
			return $query->result_array();
		}

			public function get_product() {
			$this->db->order_by('name');
			$query = $this->db->get('producten');
			return $query->result_array();
		}

		public function selecteer_producten_van_voorraad($voorraad_id){
			$this->db->order_by('producten.id', 'DESC');
				$this->db->join('voorraad', 'voorraad.id = producten.voorraad_id');
				$query = $this->db->get_where('producten', array('voorraad_id' => $voorraad_id));
				return $query->result_array();
		}

			public function selecteer_voorraadlijst($id){
			$query = $this->db->get_where('voorraad', array('id' => $id));
			return $query->row();
	}
}