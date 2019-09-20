 
 <template>
        <b-col md='10' v-show="visible" method="post" action="traitement.php">
            <slot></slot>
        </b-col>
</template>

<script>

export default {
  name: 'ReusableComponent',
} 

</script>